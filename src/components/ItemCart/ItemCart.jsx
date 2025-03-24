import React, { useState } from 'react'
import {TrashIcon} from "@heroicons/react/24/outline"

export const ItemCart = ({item, onClickReduce, onClickAdd, onClickDelete}) => {

    const handleClickReduce = () => {
        onClickReduce()
    }

    const handleClickAdd = () => {
        onClickAdd()
        console.log("Stock: ", item.stock)
    }

    const disabledAdd = () => {
        return item.quantity >= item.stock
    }

  return (
    <div className="h-30 w-9/10 border-b border-gray-300  flex items-between justify-start gap-4 p-4 last:border-b-0">
        {/* Imagen del producto */}
        <div className="w-40 h-full flex items-center justify-center">
        <img
            className="w-full h-full object-contain"
            src={`http://localhost:8080/public/images/${item.thumbnails[0]}`}
            alt={item.title}
        />
        </div>
    
        {/* Información del producto */}
        <div className="flex flex-col justify-between">
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
        
            <div className="flex border w-30 border-gray-300 items-center justify-between gap-4 mt-2">
                {/* Botón de restar */}
                <button
                onClick={handleClickReduce}
                className="px-3 py-1  rounded-lg hover:bg-red-600 active:scale-95 transition"
                >
                -
                </button>
        
                {/* Cantidad */}
                <p className="text-lg font-bold">{item.quantity}</p>
        
                {/* Botón de sumar */}
                <button
                onClick={handleClickAdd}
                className = {`px-3 py-1  rounded-lg ${disabledAdd()? "text-gray-400" : "hover:bg-green-600 active:scale-95 transition"} `}
                disabled = {disabledAdd()}
                >
                +
                </button>
            </div>
  
        </div>

        
        <div className='flex flex-col justify-between items-center ml-auto'>
            <TrashIcon onClick={onClickDelete} className='w-10 px-2 py-2 ml-auto  rounded-lg hover:bg-red-600' />
            <p className="justify-self-end self-end  text-lg font-semibold text-gray-800">${item.quantity * item.price}</p>
        </div>
        

    </div>
  )
}
