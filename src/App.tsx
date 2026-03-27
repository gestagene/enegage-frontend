import { Routes, Route } from "react-router-dom";
import RootLayout from "@/components/Layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import SubmitPage from "@/pages/SubmitPage";
import PopularPage from "@/pages/PopularPage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="submit" element={<SubmitPage />} />
        <Route path="popular" element={<PopularPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
