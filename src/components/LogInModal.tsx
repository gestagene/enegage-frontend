import "@/pages/login.css";
import { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";
import { userLogin } from "@/services/userLogin";

interface LogInModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  children?: React.ReactNode;
}

export default function LogInPage({ onClose, onSuccess }: LogInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await userLogin(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  }
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 min-h-screen "
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        <div className="relative flex flex-col space-y-1 shadow-2xl rounded-lg w-full max-w-md p-6 bg-white px-10 min-h-auto sm:min-h-auto ">
          <button
            onClick={onClose}
            className="absolute top-0.75 right-0.75 p-2 bg-gray-200 rounded-full mr-2 mt-2"
          >
            <MdClose />
          </button>
          <div className="justify-center items-center text-center flex flex-col space-y-3">
            {!showSignUp ? (
              <h1 className="font-bold text-2xl">Log In</h1>
            ) : (
              <h1 className="font-bold text-2xl">Sign Up</h1>
            )}
            <p className="text-sm">
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <div className="flex items-center gap-3 w-full py-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>
          </div>
          {!showSignUp ? (
            <div className="login-container sm:min-h-75">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 justify-center items-center py-4"
              >
                <div className="input-group">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="text-sm">Email</label>
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="text-sm">Password</label>
                </div>

                <input
                  type="submit"
                  disabled={!email || !password}
                  className="align-bottom bg-green-900 text-white py-2 px-4 rounded-full hover:cursor-pointer hover:brightness-85 w-75 disabled:opacity-75 duration-200"
                  value="Submit"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>

              <div className="flex flex-col text-xs space-y-4">
                <a href="" className="text-[#0000EE] hover:text-[#551A8B] ">
                  Forgot password?
                </a>
                <span>
                  New to enegage?{" "}
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setEmail("");
                      setPassword("");
                      setError("");
                    }}
                    className="text-[#0000EE] hover:text-[#551A8B] text-xs"
                  >
                    Sign up
                  </button>
                </span>
              </div>
            </div>
          ) : (
            <div className="signup-container sm:min-h-75">
              <form className="flex flex-col space-y-9 justify-center items-center py-4">
                <div className="input-group">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="text-sm">Email</label>
                </div>
                <input
                  type="submit"
                  disabled={!email}
                  className="align-bottom bg-green-900 text-white py-2 px-4 rounded-full hover:cursor-pointer hover:brightness-85 w-75 disabled:opacity-75 duration-200"
                  value="Continue"
                />
              </form>
              <span className="text-xs">
                Already a user?{" "}
                <button
                  onClick={() => {
                    setShowSignUp(false);
                    setEmail("");
                    setPassword("");
                    setError("");
                  }}
                  className="text-[#0000EE] hover:text-[#551A8B] text-xs"
                >
                  Log In
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
