import { createCostOpt, updateCostOpt } from "@/services/CostOpt.service";
import { getOptCostCategory } from "@/services/CostOptCtg.service";
import type { CostOperationSummaryItems } from "@/types/costOpt";
import type { CostOptCategory } from "@/types/costOptCategory";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type CostOperationFormProps = {
  onSuccess?: () => void;
  data?: CostOperationSummaryItems | null;
  isUpdate: boolean;
};

const CostOperationForm = ({
  onSuccess,
  data,
  isUpdate,
}: CostOperationFormProps) => {
  const [categoryData, setCategoryData] = useState<CostOptCategory[]>([]);
  const [name, setName] = useState(data?.name ?? "");
  const [category, setCategory] = useState(data?.category_id ?? "");
  const [expenseDate, setExpenseDate] = useState(data?.expense_date ?? "");
  const [amount, setAmount] = useState(data?.amount ?? 0);
  const [description, setDescription] = useState(data?.description ?? "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOptCostCategory();
        // const dataName = data.map((item) => item.name);
        setCategoryData(data);
      } catch (err) {
        console.log("err fetch category", err);
      }
    };
    fetchData();
  }, []);

  console.log("categoryData: ", categoryData);
  console.log("expenseDate: ", expenseDate);
  console.log("name: ", name);

  const handleCreate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCostOpt({
        name,
        category_id: category,
        expense_date: expenseDate,
        amount,
        description,
      });

      toast.success("success create items cost operational");
      onSuccess?.();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!data) return;

      await updateCostOpt(data.id, {
        name,
        category_id: category,
        expense_date: expenseDate,
        amount,
        description,
      });

      toast.success("success create items cost operational");
      onSuccess?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={isUpdate ? handleUpdate : handleCreate}
        action=""
        className="space-y-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-slate-500 font-semibold">
            name
          </label>
          <input
            type="text"
            className="rounded px-2 py-1 border border-slate-400"
            placeholder="name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-slate-500 font-semibold">
            Category
          </label>
          {/* <input
            type=""
            className="rounded px-2 py-1 border border-slate-400"
            placeholder="select category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-slate-400 rounded-xl"
          >
            <option value="" disabled>
              select category...
            </option>
            {categoryData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-slate-500 font-semibold">
            Expense Date
          </label>
          <input
            type="date"
            className="rounded px-2 py-1 border border-slate-400"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-slate-500 font-semibold">
            Amount
          </label>
          <input
            type="number"
            className="rounded px-2 py-1 border border-slate-400"
            placeholder="amount in rupiah..."
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-slate-500 font-semibold">
            Description (Optional)
          </label>
          <input
            type="text"
            className="rounded px-2 py-1 border border-slate-400"
            placeholder="describe somehting..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 rounded-xl px-4 py-2 font-semibold text-white"
          >
            {isUpdate ? "Update Data" : "Create Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CostOperationForm;
