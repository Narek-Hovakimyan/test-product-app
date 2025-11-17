import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { editProduct } from '../store/productsSlice'

export default function EditProduct(){
  const { id } = useParams()
  const product = useAppSelector(s => s.products.items.find(p => p.id === Number(id)))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState(product?.title || '')
  const [image, setImage] = useState(product?.image || '')
  const [description, setDescription] = useState(product?.description || '')

  useEffect(() => {
    if (!product) navigate('/products')
  }, [product, navigate])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!title || !image || !description) { alert('Please fill all fields'); return }
    dispatch(editProduct({ id: Number(id), title, description, image, isLiked: product?.isLiked }))
    navigate('/products')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Image URL or choose file" value={image} onChange={e=>setImage(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        {image && <img src={image} alt="Preview" className="mt-2 h-32 object-contain border rounded" />}
        <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded" type="submit">Save Changes</button>
      </form>
    </div>
  )
}
