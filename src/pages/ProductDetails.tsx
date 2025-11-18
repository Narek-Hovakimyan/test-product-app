import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function ProductDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useAppSelector(s => 
    s.products.items.find(x => x.id === Number(id))
  )

  if (!product) return <div className="p-6 text-red-500">Product not found</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <button
        onClick={() => navigate('/')}
        className="mb-4 px-3 py-1 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded p-4">
        <img 
          src={product.image} 
          className="w-full h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700">{product.description}</p>
      </div>

    </div>
  )
}
