"use client";

import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end px-4 py-6 sm:items-end sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} removeToast={removeToast} />
        ))}
      </div>
    </div>
  );
}
