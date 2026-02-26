import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/shared/lib/utils";

export function BorderedBox({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-md border px-4 py-3", className)} {...props} />
  );
}

export function SectionHeading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-2xl font-semibold", className)} {...props} />
  );
}

export function TileGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)} {...props} />;
}

type TileButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function TileButton({
  children,
  className,
  type = "button",
  ...props
}: TileButtonProps) {
  return (
    <button
      className={cn(
        "aspect-square overflow-hidden rounded-md border bg-background p-2 text-left text-xs font-medium leading-tight transition-colors hover:bg-accent",
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function TileImage({
  alt,
  className,
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      src={src}
      {...props}
    />
  );
}

export function MediaFrame({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("overflow-hidden rounded-md border", className)} {...props} />;
}

export function MediaImage({
  alt,
  className,
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={alt}
      className={cn("max-h-96 w-full object-cover", className)}
      src={src}
      {...props}
    />
  );
}

export function CommentsList({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-3", className)} {...props} />;
}

type CommentItemProps = {
  body: string;
  email: string;
};

export function CommentItem({ body, email }: CommentItemProps) {
  return (
    <li className="rounded-md border px-4 py-3">
      <p>{email}</p>
      <p>{body}</p>
    </li>
  );
}
