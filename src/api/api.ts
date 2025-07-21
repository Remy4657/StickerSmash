import axios from "@/instance/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

/** import component */

const fetchProducts = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/v1/admin/product/read"
  );
  return res.data;
};
const fetchMe = async () => {
  const res = await axios.get("http://localhost:8080/api/v1/refresh");
  return res.data;
};
type LoginData = {
  username: string;
  password: string;
};
export const login = async (data: any) => {
  const res = await axios.post<any>(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/login`,
    data
  );
  return res;
};
export const getMe = async () => {
  const res = await axios.get(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/me2`
  );
  return res;
};
export const useLogin = (data: LoginData) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login(data),
  });
};
export const useGetProductsAndCategories = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: fetchMe,
  });
};
