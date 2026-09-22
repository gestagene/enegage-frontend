import { Routes, Route } from "react-router-dom";
import RootLayout from "@/components/layouts/RootLayout";
import HomePage from "@/pages/HomeFeed";
import Fallback from "@/pages/Fallback";
import SubmitPage from "@/pages/Submit";
import PopularPage from "@/pages/Popular";
import ProtectedRoute from "@/components/ProtectedRoute";
import Comments from "@/pages/Comments";
import ScrollToTop from "./components/ui/Scroll";
import SettingsPage from "@/pages/Settings/Settings";
import Account from "@/pages/Settings/Account";
import Profile from "@/pages/Settings/Profile";
function App() {
  return (
    <>
      <ScrollToTop />
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
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Account />} />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/comments/:id/:slug?" element={<Comments />} />
          <Route path="popular" element={<PopularPage />} />
        </Route>

        <Route path="*" element={<Fallback />} />
      </Routes>
    </>
  );
}

export default App;
