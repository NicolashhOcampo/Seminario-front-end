"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import SellChart from "@/components/SellChart/SellChart";
import config from "@/config/app.config";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await fetch(`${config.urlHost}/api/receipts`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const dataFetch = await response.json();
            const receipts = dataFetch.payload;

            const map = new Map();

            // Arreglar las horas xd, se usa el sistema sueco para las fechas, pero hay que cambiarlo
            receipts.forEach((r) => {
                const day = new Date(r.date).toLocaleDateString("sv-SE", {
                    timeZone: "America/Argentina/Buenos_Aires",
                });
                map.set(day, (map.get(day) || 0) + r.totalMount);
            });

            // map.entries() devuelve un iterable de pares [clave, valor]. Ej: ["clave1", "valor1"], en nuestro caso [fecha, total]. Ej: [2025-04-09, 10000]
            // Array.from() convierte el iterable en un array. Ej: [["clave1", "valor1"], ["clave2", "valor2"]]
            // sort() ordena el array. Se le pasan los primeros parametros [a] y [b] que son los fechas del array
            const sorted = Array.from(map.entries()).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());

            const labels = sorted.map(([day]) => day);
            const data = sorted.map(([_, total]) => total);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Ventas por día",
                        data,
                        fill: true,
                        borderColor: "#4bb543",
                        backgroundColor: "rgba(75, 181, 67, 0.2)",
                        tension: 0.3,
                    },
                ],
            });

            setLoading(false);
        };

        fetchReceipts();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="mt-15 flex flex-col items-center w-full p-8">
            <h2 className="text-xl font-semibold">Ventas diarias</h2>
            <SellChart data={chartData} />
        </div>
    );
}
