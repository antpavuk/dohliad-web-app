export enum AuthRoute {
  LANDING = '/',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  SIGN_UP_BRAND = '/sign-up/brand',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  VERIFY_EMAIL = '/verify-email'
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
// export enum AppRoute {
//   HOME = '/home',
//   PROFILE = '/profile',
//   BRANDS = '/brands',
//   BRAND = '/brand/:id',
//   BRAND_CREATE = '/brand/create',
//   BRAND_EDIT = '/brand/edit/:id',
//   BRAND_PRODUCTS = '/brand/:id/products',

//   PRODUCTS = '/products',
//   PRODUCT = '/product/:id',
//   PRODUCT_CREATE = '/product/create',
//   PRODUCT_EDIT = '/product/edit/:id'
// }
