import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import RightSideBar from "../ui/RightSideBar";
import LogInModal from "@/components/ui/LogInModal";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "@/services/supabaseClient";
import ProfileMenu from "@/components/ui/ProfileMenu";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import FeedSkeleton from "@/components/ui/FeedSkeleton";
import SortControls from "@/components/ui/SortControls";

export default function RootLayout() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNav, setShowNav] = useLocalStorage("showNav", true);
  const [isLoading, setIsLoading] = useState(true);
  const [forceLogin, setForceLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const protectedRoutes = ["/submit"];
  const hideRecentTab = ["/submit"];

  useEffect(() => {
    const isProtected = protectedRoutes.includes(location.pathname);
    if (isProtected && !isLoggedIn) {
      setForceLogin(true);
    }
  }, [location.pathname, isLoggedIn, isLoading]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("type=signup")) {
      window.history.replaceState(null, "", window.location.pathname);
      setShowLoginModal(true);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setIsLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (!session) setShowLoginModal(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        query={query}
        onSearch={setQuery}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onMenuClick={() => setShowProfileMenu(true)}
        handleProfileMenu={() => setShowProfileMenu((prevState) => !prevState)}
      />{" "}
      {forceLogin && !isLoggedIn && (
        <LogInModal
          onSuccess={() => {
            setIsLoggedIn(true);
            setForceLogin(false);
            setShowLoginModal(false);
          }}
          onClose={() => {
            setForceLogin(false);
            navigate("/");
          }}
        />
      )}
      {showLoginModal && (
        <LogInModal
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
          }}
          onClose={() => {
            setShowLoginModal(false);
          }}
        />
      )}
      {showProfileMenu && (
        <ProfileMenu
          onLogout={() => {
            setShowProfileMenu(false);
            setIsLoggedIn(false);
          }}
        />
      )}
      <div className="flex">
        <Sidebar
          isCollapsed={!showNav}
          onCollapse={() => setShowNav(!showNav)}
        />
        <main className="flex flex-1 min-h-screen">
          <div className="flex flex-1 justify-center pt-4 px-4">
            <div className="flex w-full max-w-4xl gap-10">
              {/* Feed */}
              <div className="flex-1 min-w-0">
                <Outlet context={{ query }} />
              </div>

              {/* Right Sidebar */}
              {!hideRecentTab.includes(location.pathname) && (
                <div className="hidden lg:flex w-75 shrink-0 sticky top-16 self-start">
                  <RightSideBar />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
