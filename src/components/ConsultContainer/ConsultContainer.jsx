import { useState } from "react";
import { useConsult } from "@/hooks/useConsult";
import ConsultItem from "@/components/ConsultItem/ConsultItem";

const ConsultContainer = ({ consultations, productId }) => {
    const [question, setQuestion] = useState("");
    const { sendConsult, consultsLogs, answerQuery } = useConsult(productId);

    if (!consultations) return

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!question) return;
        sendConsult(question, productId);
        setQuestion("");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-8 w-6/10">
            <div className="w-full p-4 rounded-lg bg-white">
                <p className="text-black text-lg font-semibold mb-2">Pregúntale al vendedor</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <textarea
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escribí tu pregunta..."
                        maxLength={2000}
                        rows={2}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Preguntar
                    </button>
                </form>
            </div>

            <h3 className="text-lg font-semibold mb-4 w-auto">Preguntas y Respuestas</h3>
            {consultations.map((consult, index) => (
                <ConsultItem
                    key={index}
                    id={consult._id}
                    question={consult.question}
                    answer={consult.answer || null}
                    date={consult.date}
                    isLast={index === consultations.length - 1}
                    productId={productId}
                    answerQuery={answerQuery}
                />
            ))}
        </div>
    );
};

export default ConsultContainer;
