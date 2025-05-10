import { createContext } from "react";

type Mode = "success" | "error" | "info";

export type SnackbarOptions = {
  message: string;
  mode?: Mode;
  duration?: number;
};

type SnackbarContextType = {
  showSnackbar: (options: SnackbarOptions) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
