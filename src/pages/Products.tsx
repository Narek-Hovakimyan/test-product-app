import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api/fetchProducts'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setProducts, setFilter } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

export default function Products(){
  const dispatch = useAppDispatch()
  const { items, filter } = useAppSelector(s => s.products)

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(()=>{
    if (items.length === 0) {
      fetchProducts()
        .then(data => dispatch(setProducts(data)))
        .catch(()=>{})
    }
  }, [dispatch])

  const filtered = items
    .filter(p => (filter === 'liked' ? p.isLiked : true))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [currentPage, totalPages])

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link 
          to="/create-product"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={() => dispatch(setFilter('all'))}
            className={`px-3 py-1 rounded ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>

          <button
            onClick={() => dispatch(setFilter('liked'))}
            className={`px-3 py-1 rounded ${
              filter === 'liked' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginated.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  )
}
