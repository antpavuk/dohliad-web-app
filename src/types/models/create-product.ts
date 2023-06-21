import { Category } from '../category.enum';
import { Classification } from '../classification.enum';
import Ingredient from '../entities/ingredient.entity';
import { SkinCareFeature } from '../skin-care-features.enum';
import { SkinType } from '../skin-types.enum';

interface CreateProduct {
  name: string;
  description: string;
  functions: SkinCareFeature[];
  skinTypes: SkinType[];
  classification: Classification;
  category: Category;
  age: number;
  volume: number;
  ingredientIds: string[];
  purchaseUrls: string[];
}

export default CreateProduct;
