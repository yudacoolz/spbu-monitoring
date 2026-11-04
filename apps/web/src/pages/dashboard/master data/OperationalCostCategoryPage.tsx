import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  deleteOptCostCategory,
  getOptCostCategory,
} from "@/services/CostOptCtg.service";
import type { CostOptCategory } from "@/types/costOptCategory";
import { useEffect, useState } from "react";

import { Trash, PenBox } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import { UpdateCategoryCostForm } from "@/components/forms/CategoryCostForm";

export default function OperationalCostCategoryPage() {
  const [data, setData] = useState<CostOptCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CostOptCategory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getOptCostCategory();
        setData(response);
      } catch (err) {
        console.log("Error while fetching data : ", err);
        toast.error("Gagal memuat kategori");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateSuccess = (updated: CostOptCategory) => {
    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );
    setSelectedCategory(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOptCostCategory(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success("Kategori berhasil dihapus");
    } catch (err) {
      console.log("Error while deleting data : ", err);
      toast.error("Gagal menghapus kategori");
    }
  };

  return (
    <DashboardLayout
      title="Master Data Operational Cost"
      section="master data"
      subtitle="Pencatatan Cost yang dikeluarkan"
    >
      {isLoading && <div>Loading....</div>}

      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.id} className="border rounded px-4 py-2">
            <div className="flex justify-between">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.is_active ? "Aktif" : "Nonaktif"}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                {/* update */}
                <button
                  onClick={() => setSelectedCategory(item)}
                  className="bg-blue-700 text-white font-semibold text-sm rounded p-2"
                >
                  <PenBox size={16} />
                </button>
                {/* delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-700 text-white font-semibold text-sm rounded p-2"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <Modal
          title="Update Category"
          onClose={() => setSelectedCategory(null)}
        >
          <UpdateCategoryCostForm
            category={selectedCategory}
            onSuccess={handleUpdateSuccess}
          />
        </Modal>
      )}
    </DashboardLayout>
  );
}
