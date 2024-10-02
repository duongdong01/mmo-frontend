import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const UseSelectorUser = (state: RootState) => state.user.data;

export const UseSelectorCategoryProduct = (state: RootState) => state.category.categoryProduct;
export const UseSelectorCategoryService = (state: RootState) => state.category.categoryService;
