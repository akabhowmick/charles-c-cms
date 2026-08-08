import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-pine-tint px-3 py-0.5 text-xs font-semibold text-pine-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}
