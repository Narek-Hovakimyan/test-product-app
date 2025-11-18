import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { createProduct } from '../store/productsSlice'

export default function CreateProduct() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !image || !description) {
      alert('Please fill all fields')
      return
    }
    dispatch(createProduct({ id: Date.now(), title, description, image }))
    navigate('/')   // ★ FIXED
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create Product</h1>

        <button
          onClick={() => navigate('/')}   // ★ FIXED
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ← Cancel
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Image URL or choose file"
          onChange={e => setImage(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-2 h-32 object-contain border rounded"
          />
        )}

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  )
}
