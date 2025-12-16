import {
  fileUploadPath,
  loginPath,
  productsPath,
  refreshTokenPath,
  registerPath,
  usersPath,
} from "../config/path.config.ts";
import api from "./index.ts";
import type {
  FileUploadResponse,
  LoginData,
  LoginResponse,
  PaginationParams,
  ProductsCreate,
  ProductsResponse,
  ProductsUpdate,
  RefreshResponse,
  RegisterData,
  RegisterResponse,
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

export const getUsers = async (): Promise<UsersResponse[]> => {
  const response = await api.get(usersPath);
  return response.data;
};
export const updateUserData = async (data: UsersData, userId: number): Promise<UsersResponse> => {
  const response = await api.put(`${usersPath}/${userId}`, data);
  return response.data;
}
export const refresh = async (token: string): Promise<RefreshResponse> => {
  const response = await api.post(refreshTokenPath, {
    refreshToken: token,
  });
  return response.data;
};

export const getAllProducts = async (params: PaginationParams): Promise<ProductsResponse[]> => {
  const response = await api.get(productsPath, { params });
  return response.data;
};

export const createProduct = async (data: ProductsCreate): Promise<ProductsResponse> => {
  const response = await api.post(productsPath, data);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const response = await api.delete(`${productsPath}/${productId}`);
  return response.data;
};

export const updateProduct = async (data: ProductsUpdate, productId: string): Promise<void> => {
  const response = await api.put(`${productsPath}/${productId}`, data);
  return response.data;
};

export const fileUpload = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(fileUploadPath, formData);
  return response.data;
};
