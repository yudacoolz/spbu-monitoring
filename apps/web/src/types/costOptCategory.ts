export type CostOptCategory = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UpdateCostOptCategoryBody = Partial<
  Pick<CostOptCategory, "name" | "is_active">
>;
