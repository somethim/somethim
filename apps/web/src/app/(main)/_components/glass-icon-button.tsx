import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export const GlassIconButton = ({ children, className = "", ...props }: Props) => (
  <button
    type="button"
    className={`glass !rounded-full flex shrink-0 cursor-pointer items-center justify-center outline-none transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);
