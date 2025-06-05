import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/v1/admin/product/read"
  );
  return res.data;
};
export const getProductsAndCategories = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
