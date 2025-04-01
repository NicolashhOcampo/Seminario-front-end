import React, { useState } from 'react'
import ConsultContainer from '../ConsultContainer/ConsultContainer'

export const ProductDetail = ({ product, addProduct, consultations, productId }) => {
  if (!product) return null

  const [activeImg, setActiveImg] = useState(product.thumbnails[0])

  return (
    <div className='flex flex-col min-h-screen p-10'>
      <div className="mt-20 ml-20 w-8/10 flex flex-col md:flex-row gap-8 p-6">
        {/* Contenedor de imágenes */}
        <div className="md:w-1/2 p-4 w-9/10 border rounded-lg shadow-lg">
          <div className="flex gap-4">
            {/* Miniaturas */}
            <ul className="flex flex-col gap-3">
              {product.thumbnails.map((img) => (
                <li
                  key={img}
                  className={`w-16 h-16 border-2 cursor-pointer rounded-lg overflow-hidden ${
                    activeImg === img ? 'border-blue-700' : 'border-gray-300'
                  }`}
                  onClick={() => setActiveImg(img)}
                >
                  <img
                    src={`http://localhost:8080/public/images/${img}`}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </li>
              ))}
            </ul>

            {/* Imagen principal */}
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-full h-96 object-contain rounded-lg"
                src={`http://localhost:8080/public/images/${activeImg}`}
                alt={product.title}
              />
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Descripción</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Precio */}
            <p className="text-3xl font-bold text-green-600 mb-4">${product.price}</p>
          </div>

          {/* Botón de agregar al carrito */}
          <button
            onClick={addProduct}
            className="w-50 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-transform"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
      
    </div>
  )
}
