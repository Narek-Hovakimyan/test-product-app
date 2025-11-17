import React from 'react'
import { Product } from '../store/productsSlice'
import { useAppDispatch } from '../store/hooks'
import { deleteProduct, toggleLike } from '../store/productsSlice'
import { useNavigate } from 'react-router-dom'

interface Props { product: Product }

export default function ProductCard({ product }: Props){
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/products/${product.id}`)}
      className="relative bg-white rounded-lg shadow p-4 hover:shadow-md cursor-pointer h-64 flex flex-col">
      <img src={product.image} alt={product.title} className="h-32 object-contain mb-2"/>
      <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
      <p className="text-xs text-gray-600 mt-auto">{product.description.slice(0,80)}...</p>

      <button onClick={(e)=>{ e.stopPropagation(); dispatch(toggleLike(product.id)) }}
        className={`absolute top-3 right-10 text-lg ${product.isLiked ? 'text-red-500' : 'text-gray-400'}`}>
        ♥
      </button>

      <button onClick={(e)=>{ e.stopPropagation(); dispatch(deleteProduct(product.id)) }}
        className="absolute top-3 right-3 text-gray-500 text-lg">🗑</button>

      <button onClick={(e)=>{ e.stopPropagation(); navigate(`/products/edit/${product.id}`) }}
        className="absolute bottom-3 right-3 text-gray-500">✏️</button>
    </div>
  )
}
