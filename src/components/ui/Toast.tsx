import type { ToastType } from "@/context/toastContext";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { FaExclamation, FaInfo } from "react-icons/fa6";

interface ToastProps {
  type: ToastType;
  message: string;
}

const toastConfig: Record<ToastType, { icon: React.ReactNode; color: string }> =
  {
    success: {
      icon: <FaCheck size={24} />,
      color: "text-green-400 border-green-400",
    },
    error: {
      icon: <AiOutlineClose size={24} />,
      color: "text-red-400 border-red-400",
    },
    info: {
      icon: <FaInfo size={24} />,
      color: "text-blue-400 border-blue-400 p-2",
    },
    warning: {
      icon: <FaExclamation size={24} />,
      color: "text-yellow-400 border-yellow-400 p-2",
    },
  };

export default function Toast({ type, message }: ToastProps) {
  const { icon, color } = toastConfig[type];

  return (
    <div className="items-center flex gap-2 p-5 rounded-lg h-10 w-1/2 bg-white rounded-b-lg shadow-sm overflow-hidden">
      <div
        className={`flex items-center justify-center p-1 rounded-full h-6 w-6 border-2 ${color}`}
      >
        {icon}
      </div>
      <div className={`text-center text-sm ${color}`}>{message}</div>
      <div className="text-gray-300 ml-auto">
        <AiOutlineClose size={24} />
      </div>
    </div>
  );
}
