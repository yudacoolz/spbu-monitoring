import api from "@/lib/axios";
import type { UpdateCostOptCategoryBody } from "@/types/costOptCategory";

export const getOptCostCategory = async () => {
  const response = await api.get("/cost-operational-category");
  return response.data;
};

export const updateOptCostCategory = async (
  id: string,
  body: UpdateCostOptCategoryBody,
) => {
  const response = await api.patch(`/cost-operational-category/${id}`, body);
  return response.data;
};

export const deleteOptCostCategory = async (id: string) => {
  return await api.delete(`/cost-operational-category/${id}`);
};
