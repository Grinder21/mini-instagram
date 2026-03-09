import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl rounded-2xl border border-border/60 bg-card/85 text-card-foreground shadow-xl shadow-black/5 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <header className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-5 p-6 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <footer className={cn("flex items-center gap-2 p-6 pt-0", className)} {...props} />;
}
