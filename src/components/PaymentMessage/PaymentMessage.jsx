'use client'

import { useRouter } from "next/navigation";

const PaymentMessage = ({ status }) => {
  const router = useRouter();
  const handleBackHome = () => {
    router.push('/products')
  };

  const isSuccess = status === 'success';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 text-center max-w-md">
        <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {isSuccess ? '¡Pago exitoso!' : 'Pago cancelado'}
        </h2>
        <p className="text-gray-700 mb-6">
          {isSuccess
            ? 'Gracias por tu compra. Te enviaremos un correo con los detalles.'
            : 'No se completó el pago. Podés intentarlo nuevamente si lo deseás.'}
        </p>
        <button
          onClick={handleBackHome}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default PaymentMessage;
