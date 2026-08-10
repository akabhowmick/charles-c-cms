import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-pine text-paper hover:bg-pine-deep active:scale-[0.98]",
  secondary:
    "bg-transparent text-pine border border-pine hover:bg-pine-tint active:scale-[0.98]",
  ghost: "bg-transparent text-ink-soft hover:bg-paper-deep hover:text-ink",
  danger: "bg-transparent text-red-800 border border-red-300 hover:bg-red-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

/**
 * Button's visual classes, exposed so a non-`<button>` element (e.g. a router
 * `<Link>`) can look like a button without nesting a real `<button>` inside
 * an `<a>` — two overlapping interactive elements confuses the a11y tree
 * (WCAG 4.1.2). Use this on `<Link className={buttonClasses(...)}>` for
 * navigational CTAs instead of `<Link><Button>...</Button></Link>`.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    variants[variant],
    sizes[size],
    className,
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button ref={ref} className={buttonClasses({ variant, size, className })} {...props} />
  ),
);
Button.displayName = "Button";
