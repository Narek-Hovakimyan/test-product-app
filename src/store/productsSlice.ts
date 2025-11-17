import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  description: string
  image: string
  isLiked?: boolean
}

interface ProductsState {
  items: Product[]
  filter: 'all' | 'liked'
}

const initialState: ProductsState = {
  items: [],
  filter: 'all',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
    },
    createProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload)
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(x => x.id !== action.payload)
    },
    toggleLike(state, action: PayloadAction<number>) {
      const p = state.items.find(x => x.id === action.payload)
      if (p) p.isLiked = !p.isLiked
    },
    setFilter(state, action: PayloadAction<'all'|'liked'>) {
      state.filter = action.payload
    }
  }
})

export const { setProducts, createProduct, editProduct, deleteProduct, toggleLike, setFilter } = productsSlice.actions
export default productsSlice.reducer
