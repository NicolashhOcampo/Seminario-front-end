import { ArrowTurnDownRightIcon } from "@heroicons/react/24/outline";
import AnswerConsult from "../AnswerConsult/AnswerConsult";
import { useUser } from "@/context/UserContext";

const ConsultItem = ({ id, question, answer, date, isLast, productId, answerQuery }) => {

  const { user } = useUser()
    const handleAnswerSubmit = (answerConsult) => {
      answerQuery(answerConsult, id, productId)
    }
    return (
      <div className={`${!isLast ? "border-b border-gray-200" : ""} py-4`}>
        {/* Pregunta */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-black">{question}</span>
        </div>
  
        {/* Respuesta */}
        {answer ? (
          <div className="flex items-start gap-2 mt-2">
            <ArrowTurnDownRightIcon className="size-6" />
            <div>
              <span className="text-sm text-gray-600">{answer}</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-400">{date}</span>
              </div>
            </div>
          </div>
        ) : (
          (user && user.role === "admin") &&
          <AnswerConsult onSubmit={handleAnswerSubmit} />
        )}
      </div>
    );
  };
  
  export default ConsultItem;
  