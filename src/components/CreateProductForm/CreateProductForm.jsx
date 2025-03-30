'use client';

import config from '@/config/app.config';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import socket from '@/utils/socket';

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

  // Agregar nuevas imágenes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      thumbnails: [...prev.thumbnails, ...files],
    }));
    e.target.value = "";
  };

  // Eliminar una imagen específica
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((_, i) => i !== index),
    }));
  };

  // Enviar formulario
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
    
    const product = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      thumbnails: filenames,
    };

    socket.emit('createProduct', product);

    setFormData({
      title: '',
      description: '',
      code: '',
      price: '',
      status: 'true',
      stock: '',
      category: '',
      thumbnails: [],
    });

    toast.success('Product created successfully');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-15">
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" required />
        <input name="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="Code" className="w-full p-2 border rounded" required />
        <input name="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" className="w-full p-2 border rounded" required />

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="radio" name="status" value="true" checked={formData.status === 'true'} onChange={(e) => setFormData({ ...formData, status: e.target.value })} /> Active
          </label>
          <label className="flex items-center">
            <input type="radio" name="status" value="false" checked={formData.status === 'false'} onChange={(e) => setFormData({ ...formData, status: e.target.value })} /> Inactive
          </label>
        </div>

        <input name="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="Stock" className="w-full p-2 border rounded" required />
        <input name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Category" className="w-full p-2 border rounded" required />

        <div className="space-y-2">
          {formData.thumbnails.map((file, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm truncate">{file.name}</span>
              <button type="button" className="text-red-600 hover:text-red-700" onClick={() => handleRemoveImage(index)}>
                <TrashIcon className='size-5' />
              </button>
            </div>
          ))}
        </div>

        <input type="file" multiple onChange={handleFileChange} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Create Product</button>
      </form>
    </div>
  );
}
