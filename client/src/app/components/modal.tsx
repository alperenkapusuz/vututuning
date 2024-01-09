import { Dialog } from "@/app/components/ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  return <Dialog>{children}</Dialog>;
}
