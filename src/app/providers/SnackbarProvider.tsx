"use client";
import React, { useCallback, useContext, useState } from "react";
import { SnackbarContext } from "@/context/SnackbarContext";

export type Mode = "success" | "error" | "info";
export type SnackbarOptions = {
  message: string;
  mode?: Mode;
  duration?: number;
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside SnackbarProvider");
  return ctx;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbar(options);
    setVisible(true);
    setTimeout(() => setVisible(false), options.duration || 5000);
  }, []);

  const closeSnackbar = () => setVisible(false);

  const getIcon = () => {
    if (snackbar?.mode === "error") {
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      );
    } else if (snackbar?.mode === "success") {
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      );
    } else {
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0ZM9 4h2v2H9Zm2 10H9V8h2Z" />
        </svg>
      );
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <div
          className={`fixed bottom-10 left-1/2 z-50 w-full max-w-xs -translate-x-1/2 transform transition-all duration-300 ${
            visible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div
            className={`mb-4 flex w-full items-center rounded-lg p-4 shadow-sm ${
              snackbar.mode === "error"
                ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
            } `}
            role="alert"
          >
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg`}
            >
              {getIcon()}
              <span className="sr-only">
                {snackbar.mode === "error" ? "Error icon" : "Check icon"}
              </span>
            </div>
            <div className="ms-3 text-sm font-normal">{snackbar.message}</div>
            <button
              onClick={closeSnackbar}
              type="button"
              className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Close"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
