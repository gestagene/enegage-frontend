import { useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin } from "@/hooks/useLogin";
import { X } from "lucide-react";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
  children?: React.ReactNode;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"login" | "signup">("login");
  const { handleGoogleLogin } = useLogin(onSuccess);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 min-h-screen z-2 p-3"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full sm:w-lg px-8 sm:px-16 h-full bg-white rounded-xl flex flex-col items-center gap-4 pt-18 pb-6">
        {/*Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:brightness-75 hover:cursor-pointer"
        >
          <X size={18} strokeWidth={1.4} />
        </button>
        <div className="font-bold text-2xl">
          {view === "login" ? "Login" : "Sign Up"}
        </div>
        <div className="text-sm text-center">
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          theme="outline"
          size="large"
          shape="pill"
          width="100%"
        />
        <div className="flex w-full items-center gap-3 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
          <span className="text-sm text-gray-400">OR</span>
        </div>
        {/*Content */}
        {view === "login" && (
          <Login
            onSuccess={onSuccess}
            onLoading={setIsSubmitting}
            onValidChange={setIsFormValid}
          />
        )}
        {view === "signup" && (
          <Signup onLoading={setIsSubmitting} onValidChange={setIsFormValid} />
        )}
        {/*Footer */}
        <div className="flex flex-col text-sm gap-4 place-items-start w-full px-2">
          {view === "login" && (
            <>
              <a href="" className="text-[#0000EE] hover:text-[#551A8B]">
                Forgot password?
              </a>
              <span>
                New to enegage?
                <button
                  onClick={() => setView("signup")}
                  className="text-[#0000EE] hover:text-[#551A8B] text-sm"
                >
                  Sign up
                </button>
              </span>
            </>
          )}
          {view === "signup" && (
            <div className="text-sm">
              Already a user?{" "}
              <a
                onClick={() => setView("login")}
                className="text-[#0000EE] hover:text-[#551A8B] hover:cursor-pointer"
              >
                Login
              </a>
            </div>
          )}
        </div>
        <button
          type="submit"
          form={view === "login" ? "login-form" : "signup-form"}
          disabled={!isFormValid || isSubmitting}
          className="w-full p-2.5 bg-green-900 text-white rounded-full disabled:opacity-75 mt-auto h-14"
        >
          {isSubmitting ? (
            <div className="mx-auto w-6 h-6 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
          ) : view === "login" ? (
            "Submit"
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
