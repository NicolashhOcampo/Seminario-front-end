"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js";
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

export default function SellChart({data}) {
    return (
        <div className="w-full flex justify-center p-8">
            <div className="w-[80vw] bg-white p-4 rounded-xl shadow-2xl">
                <Line
                    data={data}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                type: "time",
                                time: {
                                    unit: "day",
                                },
                                title: {
                                    display: true,
                                    text: "Fecha",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Monto Total",
                                }
                            }
                        }
                    }}
                    height={75}
                />
            </div>
        </div>
    );
}