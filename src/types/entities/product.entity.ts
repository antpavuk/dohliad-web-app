import { Classification } from '../classification.enum';
import { SkinCareFeature } from '../skin-care-features.enum';
import { SkinType } from '../skin-types.enum';
import { Category } from '../category.enum';
import Ingredient from './ingredient.entity';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  age: number;
  volume: number;
  ingredients: Ingredient[];
  purchaseUrls: string[];
  functions: SkinCareFeature[];
  skinTypes: SkinType[];
  classification: Classification;
  category: Category;
  brandId: string;
}

export default Product;
