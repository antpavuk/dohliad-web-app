import { SkinCareFeature } from '../skin-care-features.enum';

export interface CreateIngredient {
  name: string;
  functions: SkinCareFeature[];
}
