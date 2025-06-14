import { Routes, Route } from "react-router-dom";
import AuthLayout from "./admin/layouts/auth";
import AdminLayout from "./admin/layouts/admin";
import Frontend from "./frontend/layouts";
import excludedRoutes from "./admin/routes/excludedRoutes";

export default function App() {
  return (
    <>
      <Routes>
        {/* Portfolio */}
        <Route path="/*" element={<Frontend />} />

        {/* Admin */}
        <Route path="admin/auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout extraRoutes={excludedRoutes} />} />
      </Routes>
    </>
  );
}
