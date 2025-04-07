"use client";

import { useState } from "react";

const AnswerConsult = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Escribí tu respuesta..."
        rows={2}
        maxLength={2000}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="self-end bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Responder
      </button>
    </form>
  );
};

export default AnswerConsult;
