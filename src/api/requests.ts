import {
  categoriesPath,
  fileUploadPath,
  loginPath,
  logUserPath,
  productsPath,
  refreshTokenPath,
  registerPath,
  usersPath,
} from "../config/path.config.ts";
import api from "./index.ts";
import type {
  CategoryCreateData,
  CategoryResponse,
  FileUploadResponse,
  LoginData,
  LoginResponse,
  PaginationParams,
  ProductCreateData,
  ProductResponse,
  RefreshResponse,
  RegisterData,
  RegisterResponse,
  CategoryUpdateData,
  ProductUpdateData,
  UsersData,
  UsersResponse,
} from "./types.ts";

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post(registerPath, data);
  return response.data;
};
export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post(loginPath, data);
  return response.data;
};
export const getLogUser = async (): Promise<RegisterResponse> => {
  const response = await api.get(logUserPath);
  return response.data;
};
export const getUsers = async (): Promise<UsersResponse[]> => {
  const response = await api.get(usersPath);
  return response.data;
};
export const updateUserData = async (data: UsersData, userId: number): Promise<UsersResponse> => {
  const response = await api.put(`${usersPath}/${userId}`, data);
  return response.data;
};
export const refresh = async (token: string): Promise<RefreshResponse> => {
  const response = await api.post(refreshTokenPath, {
    refreshToken: token,
  });
  return response.data;
};
export const getAllProducts = async (params: PaginationParams): Promise<ProductResponse[]> => {
  const response = await api.get(productsPath, { params });
  return response.data;
};
export const createProduct = async (data: ProductCreateData): Promise<ProductResponse> => {
  const response = await api.post(productsPath, data);
  return response.data;
};
export const deleteProduct = async (productId: number): Promise<boolean> => {
  const response = await api.delete(`${productsPath}/${productId}`);
  return response.data;
};
export const updateProduct = async (data: ProductUpdateData, productId: number): Promise<ProductResponse> => {
  const response = await api.put(`${productsPath}/${productId}`, data);
  return response.data;
};
export const getCategories = async (params: { limit: number }): Promise<CategoryResponse[]> => {
  const response = await api.get(categoriesPath, { params });
  return response.data;
};
export const getProductsByCategory = async (categoryId: number): Promise<ProductResponse[]> => {
  const response = await api.get(`${categoriesPath}/${categoryId}/products`);
  return response.data;
};
export const updateCategory = async (data: CategoryUpdateData, categoryId: number): Promise<CategoryResponse> => {
  const response = await api.put(`${categoriesPath}/${categoryId}`, data);
  return response.data;
};
export const createCategory = async (data: CategoryCreateData): Promise<CategoryResponse> => {
  const response = await api.post(categoriesPath, data);
  return response.data;
};
export const fileUpload = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(fileUploadPath, formData);
  return response.data;
};
