"use client";

import { Toast } from "@base-ui/react/toast";

export { Toast };

export const Toaster = () => {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Viewport className="fixed right-6 bottom-6 z-999 flex w-80 flex-col gap-2.5">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          toast={toast}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[rgba(18,18,22,0.88)] px-4 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 data-ending-style:translate-y-2 data-starting-style:translate-y-2 data-ending-style:opacity-0 data-starting-style:opacity-0"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {toast.title && (
              <Toast.Title className="font-semibold text-[13px] text-white leading-snug">
                {toast.title}
              </Toast.Title>
            )}
            {toast.description && (
              <Toast.Description className="text-[12px] text-white/45 leading-snug">
                {toast.description}
              </Toast.Description>
            )}
          </div>
          <Toast.Close className="mt-0.5 shrink-0 cursor-pointer text-white/25 transition-colors duration-200 hover:text-white/60">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Toast.Close>
        </Toast.Root>
      ))}
    </Toast.Viewport>
  );
};
