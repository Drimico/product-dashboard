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
  creationAt: Date;
  updatedAt: Date;
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


export type RefreshResponse = LoginResponse;
export interface IsAvailableEmailResponse {
  isAvailable: boolean;
}
export interface PaginationParams {
  limit: number;
  offset: number;
  page: number;
}

export interface ProductsResponse {
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
    creationAt: Date;
    updatedAt: Date;
  };
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}

export interface ProductsCreate {
  title: string;
  description: string;
  categoryId: number;
  price: number;
  images: string[];
}

export interface ProductsUpdate {
  title: string;
  description: string;
  categoryId: number;
  price: number;
  images: string[];
}
export interface ProductsDelete {
  path: string;
  timestamp: Date;
  name: string;
  message: string;
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
