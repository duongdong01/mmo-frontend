import Search from '../../components/search/search';
import CategorySlider from '../../components/categoryslider/CategorySlider';
import { UseAppDispatch, UseSelectorCategoryProduct, UseSelectorCategoryService } from '../../stores/app/hook';
export default function Home() {
  const dispatch = UseAppDispatch();
  const categoryProduct = UseSelectorCategoryProduct;
  const categoryService = UseSelectorCategoryService;
  return (
    <div className="flex flex-col">
      <Search />
      <CategorySlider type="SẢN PHẢM" />
      <CategorySlider type="DỊCH VỤ" />
    </div>
  );
}
