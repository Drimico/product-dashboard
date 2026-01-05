export interface RegisterData {
  email: string;
  name: string;
  password: string;
  avatar?: string;
  role: string;
}
export interface RegisterResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
  creationAt?: Date;
  updatedAt?: Date;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
export interface UsersResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}
export interface UsersData {
  email: string;
  password: string;
  name: string;
  avatar: string;
}
export type RefreshResponse = LoginResponse;
export interface IsAvailableEmailResponse {
  isAvailable: boolean;
}
export interface PaginationParams {
  limit: number;
  offset: number;
  page: number;
}
export interface ProductResponse {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}
export interface ProductUpdateData {
  title: string;
  price: number;
  categoryId: number;
  images: string[];
}
export interface ProductCreateData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  image: string;
}
export interface CategoryUpdateData {
  name: string;
}
export interface CategoryCreateData {
  name: string;
  image: string;
}
export interface FileUploadResponse {
  originalname: string;
  filename: string;
  location: string;
}
export interface User extends RegisterResponse {
  refreshToken?: string;
  accessToken?: string;
}
