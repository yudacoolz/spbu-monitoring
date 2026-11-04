import api from "@/lib/axios";
import type {
  CreateCostOperationBody,
  UpdateCostOperationBody,
} from "@/types/costOpt";

export const createCostOpt = async (body: CreateCostOperationBody) => {
  const data = await api.post("/cost-operational", body);
  return data;
};
export const getAllCostOpt = async (filter: {
  month: number;
  year: number;
}) => {
  const datas = await api.get("/cost-operational", {
    params: {
      month: filter.month,
      year: filter.year,
    },
  });
  return datas.data;
};
export const updateCostOpt = async (
  id: string,
  body: UpdateCostOperationBody,
) => {
  const data = await api.patch(`/cost-operational/${id}`, body);
  return data;
};
export const deleteCostOpt = async (id: string) => {
  await api.delete(`/cost-operational/${id}`);
  return;
};
