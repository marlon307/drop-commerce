type ToastType = "success" | "error" | "info";

export type Toast = {
  id?: number;
  message: string;
  type?: ToastType;
  duration?: number;
};

let counter = $state(0);
export const toasts = $state<Toast[]>([]);

export function showToast(props: Toast) {
  const id = (counter += 1);

  toasts.push({ ...props, id });

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
  }, props.duration ?? 3000);
}

export function removeToast(id: number) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) toasts.splice(index, 1);
}
