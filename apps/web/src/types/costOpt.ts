import type { CostOptCategory } from "./costOptCategory";

export type CostOperation = {
  id: string;
  name: string;
  category_id: string;
  category: CostOptCategory;
  expense_date: string;
  amount: number;
  description: string;
  created_at: string;
  updated_at: string;
};

export type CreateCostOperationBody = Pick<
  CostOperation,
  "name" | "category_id" | "expense_date" | "amount" | "description"
>;

export type UpdateCostOperationBody = Partial<CreateCostOperationBody>;

// GET

export type CostOperationSummaryItems = {
  id: string;
  name: string;
  category_id: string;
  expense_date: string;
  amount: number;
  description: string;
};

export type CostOperationSummary = {
  categoryId: string;
  categoryName: string;
  itemCount: number;
  items: CostOperationSummaryItems[];
  total: number;
};
