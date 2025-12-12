import { toast } from "sonner";

const info = (message: string) => {
  toast.info(message, {
    position: "top-right",
    style: {
      "--normal-bg": "light-dark(var(--color-sky-600), var(--color-sky-400))",
      "--normal-text": "var(--color-white)",
      "--normal-border":
        "light-dark(var(--color-sky-600), var(--color-sky-400))",
    } as React.CSSProperties,
  });
};

const success = (message: string) => {
  toast.success(message, {
    position: "top-right",
    style: {
      "--normal-bg":
        "light-dark(var(--color-green-600), var(--color-green-600))",
      "--normal-text": "var(--color-white)",
      "--normal-border":
        "light-dark(var(--color-green-600), var(--color-green-600))",
    } as React.CSSProperties,
  });
};

const warning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    style: {
      "--normal-bg":
        "light-dark(var(--color-amber-600), var(--color-amber-600))",
      "--normal-text": "var(--color-white)",
      "--normal-border":
        "light-dark(var(--color-amber-600), var(--color-amber-600))",
    } as React.CSSProperties,
  });
};

const error = (message: string) => {
  toast.error(message, {
    position: "top-right",
    style: {
      "--normal-bg":
        "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
      "--normal-text": "var(--color-white)",
      "--normal-border": "transparent",
    } as React.CSSProperties,
  });
};

export const customToaster = {
  info,
  success,
  warning,
  error,
};
