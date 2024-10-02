import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface CategoryState {
  categoryProduct: Category[];
  categoryService: Category[];
}

const initialState: CategoryState = {
  categoryProduct: [],
  categoryService: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setCategoryProduct(state, action: PayloadAction<Category[]>) {
      state.categoryProduct = action.payload;
    },
    setCategoryService(state, action: PayloadAction<Category[]>) {
      state.categoryService = action.payload;
    },
  },
});

export const { setCategoryProduct, setCategoryService } = categorySlice.actions;
export default categorySlice.reducer;
