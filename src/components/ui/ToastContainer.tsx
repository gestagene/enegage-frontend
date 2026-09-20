import { useToast } from "@/context/toastContext";
import Toast from "@/components/ui/Toast";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 z-50 flex flex-col gap-2 truncate left-1/2 -translate-x-1/2">
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type} message={toast.message} />
      ))}
    </div>
  );
}
