import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PendapatanPage from "./pages/dashboard/PendapatanPage";
import OverheadCostPage from "./pages/dashboard/OverheadCostPage";
import OperationalCostPage from "./pages/dashboard/OperationalCostPage";
import LabaRugiPage from "./pages/dashboard/LabaRugiPage";
import NeracaPage from "./pages/dashboard/NeracaPage";
import KuotaSubsidiPage from "./pages/dashboard/KuotaSubsidiPage";
import PenerimaanPage from "./pages/dashboard/PenerimaanPage";
import TangkiDispenserPage from "./pages/dashboard/TangkiDispenserPage";
import PerawatanAsetPage from "./pages/dashboard/PerawatanAsetPage";
import LoginPage from "./pages/auth/LoginPage";
import DetailPenerimaanPage from "./pages/dashboard/DetailPenerimaanPage";
import MasterDataPage from "./pages/dashboard/MasterDataPage";
import OperationalCostCategoryPage from "./pages/dashboard/master data/OperationalCostCategoryPage";
import OverheadCostCategoryPage from "./pages/dashboard/master data/OverheadCostCategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pendapatan" element={<PendapatanPage />} />
        <Route path="/laba-rugi" element={<LabaRugiPage />} />
        <Route path="/neraca" element={<NeracaPage />} />
        <Route path="/biaya-operasional" element={<OperationalCostPage />} />
        <Route path="/biaya-overhead" element={<OverheadCostPage />} />
        <Route path="/kuota-subsidi" element={<KuotaSubsidiPage />} />
        <Route path="/penerimaan" element={<PenerimaanPage />} />
        <Route path="/penerimaan/:id" element={<DetailPenerimaanPage />} />
        <Route path="/tangki-dispenser" element={<TangkiDispenserPage />} />
        <Route path="/perawatan-aset" element={<PerawatanAsetPage />} />

        {/* Master Data */}
        <Route path="/master-data" element={<MasterDataPage />} />
        <Route
          path="/master-data/biaya-operasional"
          element={<OperationalCostCategoryPage />}
        />
        <Route
          path="/master-data/biaya-overhead"
          element={<OverheadCostCategoryPage />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
