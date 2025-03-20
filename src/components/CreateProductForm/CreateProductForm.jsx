'use client';

import config from '@/config/app.config';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(config.urlHost);

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    price: '',
    status: 'true',
    stock: '',
    category: '',
    thumbnails: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, thumbnails: [...prev.thumbnails, ...files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploadData = new FormData();
    formData.thumbnails.forEach((file) => uploadData.append('thumbnails', file));
    
    const res = await fetch(`${config.urlHost}/api/viewsproducts/upload`, {
      method: 'POST',
      body: uploadData,
      credentials: 'include',
    });
    
    if (!res.ok) {
      console.error('Error uploading images');
      return;
    }
    
    const { filenames } = await res.json();
    
    const product = { ...formData, price: Number(formData.price), stock: Number(formData.stock), thumbnails: filenames };
    socket.emit('createProduct', product);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-15">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input name="code" value={formData.code} onChange={handleChange} placeholder="Code" className="w-full p-2 border rounded" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="radio" name="status" value="true" checked={formData.status === 'true'} onChange={handleChange} /> Active
          </label>
          <label className="flex items-center">
            <input type="radio" name="status" value="false" checked={formData.status === 'false'} onChange={handleChange} /> Inactive
          </label>
        </div>
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <input type="file" multiple onChange={handleFileChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create Product</button>
      </form>
    </div>
  );
}
