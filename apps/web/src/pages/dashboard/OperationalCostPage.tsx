import { AddCategoryCostForm } from "@/components/forms/CategoryCostForm";
import CostOperationForm from "@/components/forms/CostOperationForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import ProgressBar from "@/components/ui/ProgressBar";
import Tabs from "@/components/ui/Tabs";
import { deleteCostOpt, getAllCostOpt } from "@/services/CostOpt.service";
import type {
  CostOperationSummary,
  CostOperationSummaryItems,
} from "@/types/costOpt";
import { useState, useEffect, useMemo, useCallback } from "react";
import { PenBox, Trash } from "lucide-react";
import { toast } from "sonner";

type ModalType = "category" | "CostItem";

export default function OperationalCostPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [period, setPeriod] = useState("2026-10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalSelect, setModalSelect] = useState<ModalType>("CostItem");
  const [dataCost, setDataCost] = useState<CostOperationSummary[]>([]);
  const [dataCostforUpdate, setDataCostforUpdate] =
    useState<CostOperationSummaryItems | null>(null);

  const fetchData = useCallback(async () => {
    const [year, month] = period.split("-").map(Number);

    const data = await getAllCostOpt({ month, year });
    setDataCost(data);
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("dataCost:", dataCost);

  const total = useMemo(() => {
    const amountPerItems = dataCost.map((item) => item.total);
    const sum = amountPerItems.reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    );
    return sum;
  }, [dataCost]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCostCreated = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const handleAddCategory = () => {
    setModalSelect("category");
    setIsModalOpen(true);
  };

  const handleAddCost = () => {
    setModalSelect("CostItem");
    setIsModalOpen(true);
  };

  const handleUpdateCostItem = async (row: CostOperationSummaryItems) => {
    setDataCostforUpdate(row);
    setModalSelect("CostItem");
    setIsModalOpen(true);
  };

  const handleDeleteCostItem = async (id: string) => {
    try {
      await deleteCostOpt(id);
      toast.success("Data has been deleted");
      await fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Data failed to delete");
    }
  };

  console.log("ModalSelect: ", ModalSelect);
  console.log("ModalSelect: ", isModalOpen);

  return (
    <div>
      <DashboardLayout
        title="Operational Cost"
        section="Keuangan"
        subtitle="Pencatatan Cost yang dikeluarkan"
      >
        <h2>Operational Cost</h2>

        <div className="flex justify-between items-center">
          <Tabs
            value={period}
            onChange={setPeriod}
            items={[
              { label: "Jul", value: "2026-07" },
              { label: "Agu", value: "2026-08" },
              { label: "Sep", value: "2026-09" },
              { label: "Okt", value: "2026-10" },
            ]}
          />

          <div className="flex items-center gap-2">
            {!isEdit && (
              <>
                <button
                  onClick={() => handleAddCategory()}
                  className="px-4 py-2 rounded bg-blue-900 text-white font-semibold"
                >
                  + tambah kategori
                </button>
                <button
                  onClick={() => handleAddCost()}
                  className="px-4 py-2 rounded bg-blue-900 text-white font-semibold"
                >
                  + Tambah Biaya
                </button>
              </>
            )}
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="px-4 py-2 rounded bg-green-500 text-white font-semibold"
            >
              <PenBox size={20} />
            </button>
          </div>
        </div>

        {/* body */}
        <Card title="Total Biaya Bulan ini" className="mt-5">
          <div className="p-5">
            {/* <p className="text-xs font-medium tracking-wide text-[#7890AA] uppercase">
            tes 1
          </p> */}

            <p className=" border-l-2 border-[#10243A] pl-3 text-xl font-semibold">
              {total}
            </p>

            <p className="mt-4 border-l-2 border-[#DCE5F0] pl-3 text-xs leading-5 text-[#526B86]">
              {period}
            </p>
          </div>
        </Card>

        <div className="flex justify-between gap-4">
          {/* left side */}
          <div className="flex-1">
            <Card title="Total Biaya Bulan ini" className="mt-5">
              {dataCost.map((item) => (
                <div className="">
                  <div className="bg-slate-100 flex justify-between px-4 py-2">
                    <p className="text-xs font-medium tracking-wide text-[#7890AA] uppercase">
                      {item.categoryName} . {item.itemCount}
                    </p>
                    <p className="text-xs font-medium tracking-wide text-[#7890AA] uppercase">
                      {item.total}
                    </p>
                  </div>

                  {item.items.map((row) => (
                    <div className="px-4 py-2 mb-2">
                      <div className="flex justify-between items-center">
                        <p className=" border-l-2 border-[#10243A] pl-3 text-sm font-semibold">
                          {row.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className=" border-l-2 border-[#10243A] pl-3 text-sm font-semibold">
                            Rp {row.amount}
                          </p>
                          {isEdit && (
                            <div className="flex gap-2 items-center">
                              <button
                                className="bg-blue-500 text-white p-2 rounded-xl"
                                onClick={() => handleUpdateCostItem(row)}
                              >
                                <PenBox size={14} />
                              </button>
                              <button
                                className="bg-red-500 text-white p-2 rounded-xl"
                                onClick={() => handleDeleteCostItem(row.id)}
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <ProgressBar
                        className="mt-3"
                        segments={[{ value: 70, color: "#2D805E" }]}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </Card>
          </div>

          {/* right side */}
          <div className="flex-1">
            <Card title="Total Biaya Bulan ini" className="mt-5">
              <div className="p-5">
                <div className="bg-slate-400 flex justify-between">
                  <p className="text-xs font-medium tracking-wide text-[#7890AA] uppercase">
                    Elektronik
                  </p>
                  <p className="text-xs font-medium tracking-wide text-[#7890AA] uppercase">
                    Rp 72 jt
                  </p>
                </div>

                <p className=" border-l-2 border-[#10243A] pl-3 text-xl font-semibold">
                  Rp 105jt
                </p>

                <p className="mt-4 border-l-2 border-[#DCE5F0] pl-3 text-xs leading-5 text-[#526B86]">
                  September 2025
                </p>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
      {isModalOpen && ModalSelect === "category" && (
        <Modal title="Add Category" onClose={() => handleCloseModal()}>
          <div>
            <AddCategoryCostForm />
          </div>
        </Modal>
      )}

      {isModalOpen && ModalSelect === "CostItem" && (
        <Modal
          title={isEdit ? "Update Item" : "Add Items"}
          onClose={() => handleCloseModal()}
        >
          <CostOperationForm
            onSuccess={handleCostCreated}
            data={dataCostforUpdate}
            isUpdate={isEdit}
          />
        </Modal>
      )}
    </div>
  );
}
