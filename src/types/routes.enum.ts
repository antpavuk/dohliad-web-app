export enum AuthRoute {
  LANDING = '/',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  SIGN_UP_BRAND = '/sign-up/brand'
}

export enum ClientRoute {
  HOME = '/client/',
  BRANDS = '/client/brands',
  BRAND = '/client/brand/:id',
  PRODUCTS = '/client/products',
  PRODUCT = '/client/product/:id',
  QUIZ = '/client/quiz',
  QUIZ_RESULT = '/client/quiz/result',
  SKINCARE_ROUTINE = '/client/skincare-routine',
  SKINCARE_ROUTINE_WISH_LIST = '/client/skincare-routine/wish-list'
}

export enum AdminRoute {
  HOME = '/admin/',
  BRANDS = '/admin/brands',
  BRAND = '/admin/brand/:id',
  USERS = '/admin/users',
  USER = '/admin/user/:id',
  PRODUCTS = '/admin/products',
  PRODUCT = '/admin/product/:id'
}

export enum BrandRoute {
  BRAND_CURRENT_USER = '/brand/current-user',
  BRAND = '/brand/:id',
  BRANDS = '/brand/brands',
  PROFILE = '/brand/profile',
  PRODUCTS = '/brand/products',
  PRODUCT = '/brand/product/:id',
  PRODUCT_CREATE = '/brand/product/create',
  PRODUCT_EDIT = '/brand/product/edit/:id'
}

export enum IngredientRoute {
  INGREDIENTS = '/ingredients',
  INGREDIENT = '/ingredient/:id'
}

export enum ProductRoute {
  PRODUCT = '/product/:id',
  PRODUCTS = '/products',
  CREATE_PRODUCT = '/product/create'
}
