import { ArrowRight } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

type PrimaryButtonProps = LinkProps & {
  children: ReactNode;
  withIcon?: boolean;
  className?: string;
};

export function PrimaryButton({
  children,
  withIcon = true,
  className = "",
  ...linkProps
}: PrimaryButtonProps) {
  return (
    <Link
      {...linkProps}
      className={`
        inline-flex w-fit shrink-0 items-center gap-2
        rounded-full bg-primary px-7 py-3.5
        text-sm font-semibold text-primary-foreground
        shadow-sm transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
        ${className}
      `}
    >
      {children}
      {withIcon && (
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
    </Link>
  );
}