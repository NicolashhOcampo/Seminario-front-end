'use client';

import config from '@/config/app.config';
import { useState } from 'react';
import io from 'socket.io-client';

const socket = io(config.urlHost);

export default function DeleteProductForm() {
    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = (e) => {
        e.preventDefault();
        if (!productId) {
            setMessage('Please enter a Product ID');
            return;
        }
        
        socket.emit('deleteProduct', productId);
        setMessage(`Product ${productId} deleted successfully!`);
        setProductId('');
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Delete Product</h2>
            <p className="text-gray-600 text-center mb-4">Please enter the Product ID to delete it from the database.</p>
            <form onSubmit={handleDelete} className="space-y-4">
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                    type="submit" 
                    className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                    Delete Product
                </button>
            </form>
            {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
        </div>
    );
}