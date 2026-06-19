import { Routes, Route } from "react-router-dom";
import RootLayout from "@/components/Layouts/RootLayout";
import HomePage from "@/pages/HomeFeed";
import ErrorPage from "@/pages/NotFound";
import SubmitPage from "@/pages/Submit";
import PopularPage from "@/pages/Popular";

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
