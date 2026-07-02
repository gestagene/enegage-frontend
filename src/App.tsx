import { Routes, Route } from "react-router-dom";
import RootLayout from "@/components/layouts/RootLayout";
import HomePage from "@/pages/HomeFeed";
import Fallback from "@/pages/Fallback";
import SubmitPage from "@/pages/Submit";
import PopularPage from "@/pages/Popular";
import ProtectedRoute from "./components/ui/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <SubmitPage />
            </ProtectedRoute>
          }
        />
        <Route path="popular" element={<PopularPage />} />
      </Route>

      <Route path="*" element={<Fallback />} />
    </Routes>
  );
}

export default App;
