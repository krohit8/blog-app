import type { signInType, signUpType } from "@krohit8/blog-common";
import { apiClient } from "./axiosClient";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  author: {
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserInfoResponse {
  user: User;
}

export const createUserAccount = async (data: signUpType): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/v1/user/signup", data);
  return response.data;
};

export const signInAccount = async (data: signInType): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/v1/user/signin", data);
  return response.data;
};

export const userInfo = async (): Promise<UserInfoResponse> => {
  const response = await apiClient.get("/api/v1/user/me");
  return response.data;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await apiClient.get("/api/v1/blog/bulk");
  return response.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
  const response = await apiClient.get(`/api/v1/blog/${id}`);
  return response.data;
};

export const createBlog = async (data: { title: string; content: string }): Promise<{ id: string }> => {
  const response = await apiClient.post("/api/v1/blog/", data);
  return response.data;
};

export const updateBlog = async(data: { id: string; title?: string; content?: string }): Promise<void> => {
    const response = await apiClient.put("/api/v1/blog/", data)
    return response.data
}