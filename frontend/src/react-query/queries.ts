import {
  createBlog,
  createUserAccount,
  getBlog,
  getBlogs,
  signInAccount,
  updateBlog,
  userInfo,
} from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import type { signInType, signUpType } from "@krohit8/blog-common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "./queryKeys";

export function useCreateUserAccount() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: signUpType) => createUserAccount(user),
    onSuccess: async (data) => {
      if (data.token) {
        setToken(data.token);
        await queryClient.prefetchQuery({
          queryKey: [queryKeys.GET_ALL_BLOGS],
          queryFn: getBlogs,
        });

        navigate("/blogs");
      }
    },
    onError: (error) => {
      console.log("Signup failed", error);
    },
  });
}

export function useSignInAccount() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: signInType) => signInAccount(user),
    onSuccess: async (data) => {
      if (data.token) {
        setToken(data.token);
        await queryClient.prefetchQuery({
          queryKey: [queryKeys.GET_ALL_BLOGS],
          queryFn: getBlogs,
        });

        navigate("/blogs");
      }
    },
    onError: (error) => {
      console.error("Signin failed:", error);
    },
  });
}

export function useUserMe() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: [queryKeys.GET_USER_INFO],
    queryFn: () => userInfo(),
    enabled: !!token,
  });
}

export function useBlogs() {
  return useQuery({
    queryKey: [queryKeys.GET_ALL_BLOGS],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: [queryKeys.GET_BLOG, id],
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; content: string }) => createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_BLOGS] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; title?: string; content?: string }) =>
      updateBlog(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_BLOGS] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_BLOG, variables.id],
      });
    },
  });
}
