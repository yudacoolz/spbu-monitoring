import api from "@/lib/axios";
import { updateOptCostCategory } from "@/services/CostOptCtg.service";
import type { CostOptCategory } from "@/types/costOptCategory";
import React, { useState } from "react";
import { toast } from "sonner";

export const AddCategoryCostForm = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await api.post("cost-operational-category", { name });
      return data.data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="">Kategori Name</label>
          <input
            type="text"
            className="p-2 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {isLoading ? (
          <p>loading...</p>
        ) : (
          <button
            type="submit"
            className="p-2 rounded bg-blue-500 text-white font-semibold mt-4"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
};

interface UpdtCategoryOptProp {
  category: CostOptCategory;
  onSuccess: (updated: CostOptCategory) => void;
}

export const UpdateCategoryCostForm = ({
  category,
  onSuccess,
}: UpdtCategoryOptProp) => {
  const [name, setName] = useState(category.name);
  const [isActive, setIsActive] = useState<boolean>(category.is_active);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateOptCostCategory(category.id, { name, is_active: isActive });
      onSuccess({ ...category, name, is_active: isActive });
      toast.success("Kategori berhasil diperbarui");
    } catch (err) {
      console.log(err);
      toast.error("Gagal memperbarui kategori");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="update-name">Kategori Name</label>
          <input
            id="update-name"
            type="text"
            className="p-2 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            id="update-is-active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="update-is-active">Aktif</label>
        </div>

        {isLoading ? (
          <p>loading...</p>
        ) : (
          <button
            type="submit"
            className="p-2 rounded bg-blue-500 text-white font-semibold mt-4"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};
