import Header from "../Header";
import Sidebar from "../Sidebar";
import RecentTab from "../RecentTab";
import LogInModal from "@/components/LogInModal";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "@/services/supabaseClient";

export default function RootLayout() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      if (!session) setShowLoginModal(false); // close modal on logout
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
      />{" "}
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
      <div className="main-content-area">
        <Sidebar />
        <main className="flex flex-col gap-4 md:gap-0 p-4 divide-y divide-gray-200 w-full">
          <Outlet context={{ query }} />
        </main>
        <RecentTab />
      </div>
    </div>
  );
}
