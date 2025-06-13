import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/instance/axios";

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
  email: string;
  password: string;
};
const login = async (data: LoginData) => {
  const res = await axios.post("http://localhost:8080/api/v1/user/login", data);
  return res?.data;
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
