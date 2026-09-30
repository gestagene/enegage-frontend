import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSideBar from "@/components/layout/RightSideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "@/components/profile/ProfileMenu";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import AuthModal from "@/components/auth/AuthModal";
import UsernameSetup from "@/components/onboarding/UsernameSetup";

export default function RootLayout() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    needsUsername,
    profileLoading,
  } = useAuth();
  const [query, setQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNav, setShowNav] = useLocalStorage("showNav", true);
  const location = useLocation();
  const hideRecentTab = ["/submit"];
  const menuRef = useClickOutside<HTMLDivElement>(
    () => setShowProfileMenu(false),
    showProfileMenu,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-11 h-11 border-3 border-green-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (isLoggedIn && needsUsername) return <UsernameSetup />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        query={query}
        onSearch={setQuery}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuthModal(true)}
        onMenuClick={() => setShowProfileMenu(true)}
        handleProfileMenu={() => setShowProfileMenu((prevState) => !prevState)}
      />
      {showAuthModal && (
        <AuthModal
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowAuthModal(false);
          }}
          onClose={() => {
            setShowAuthModal(false);
          }}
        />
      )}
      {showProfileMenu && (
        <ProfileMenu
          menuRef={menuRef}
          onLogout={() => {
            setShowProfileMenu(false);
            setIsLoggedIn(false);
          }}
        />
      )}
      <div className="flex">
        <div className="relative hidden lg:flex w-65 shrink-0">
          <Sidebar
            isCollapsed={!showNav}
            onCollapse={() => setShowNav(!showNav)}
          />
        </div>
        <main className="flex flex-1 min-h-screen min-w-0 justify-center">
          <div className="flex flex-1 justify-center pt-4 min-w-0">
            <div className="relative flex flex-1 w-full max-w-250 min-w-0 gap-6">
              {/* Feed */}
              <div className="flex-2 min-w-0 px-2">
                <Outlet context={{ query }} />
              </div>
              {/* Right Sidebar */}
              {!hideRecentTab.includes(location.pathname) && (
                <div className="sticky top-18 self-start hidden lg:flex w-65 shrink-0">
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
