import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant =
  | "pending"
  | "approved"
  | "rejected"
  | "closed"
  | "accepted"
  | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  pending: "bg-accent/10 text-accent",
  approved: "bg-success-bg text-success",
  accepted: "bg-success-bg text-success",
  rejected: "bg-danger-bg text-danger",
  closed: "bg-neutral-bg text-neutral",
  neutral: "bg-neutral-bg text-ink",
};

const labels: Record<BadgeVariant, string> = {
  pending: "En attente",
  approved: "Approuvé",
  accepted: "Acceptée",
  rejected: "Refusé",
  closed: "Fermé",
  neutral: "",
};

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children ?? labels[variant]}
    </span>
  );
}