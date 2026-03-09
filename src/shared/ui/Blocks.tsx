import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/shared/lib/utils";
import { Avatar } from "@/shared/ui/Avatar";

export function BorderedBox({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-muted/30 px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-xl font-semibold sm:text-2xl", className)} {...props} />
  );
}

export function TileGrid({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:[grid-template-columns:repeat(var(--app-grid-columns,3),minmax(0,1fr))]",
        className
      )}
      {...props}
    />
  );
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
        "group aspect-square overflow-hidden rounded-xl border border-border/60 bg-background/90 p-2 text-left text-xs font-medium leading-tight shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:bg-accent/70",
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
      className={cn("h-full w-full object-cover transition-transform duration-300", className)}
      src={src}
      {...props}
    />
  );
}

export function MediaFrame({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-muted/40 p-2",
        className
      )}
      {...props}
    />
  );
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
      className={cn("max-h-[34rem] w-full rounded-xl object-cover", className)}
      src={src}
      {...props}
    />
  );
}

export function CommentsList({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-4", className)} {...props} />;
}

type CommentItemProps = {
  body: string;
  email: string;
  name?: string;
  avatarSrc?: string;
  dateTimeIso?: string;
  dateTimeLabel?: string;
};

export function CommentItem({
  avatarSrc,
  body,
  dateTimeIso,
  dateTimeLabel,
  email,
  name,
}: CommentItemProps) {
  return (
    <li className="rounded-xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <Avatar
          alt={name ?? email}
          className="size-9"
          fallback={name ?? email}
          src={avatarSrc}
        />
        <div className="min-w-0">
          {name && <p className="truncate text-sm font-semibold">{name}</p>}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <p className="truncate">{email}</p>
            {dateTimeLabel && (
              <time dateTime={dateTimeIso} className="shrink-0">
                {dateTimeLabel}
              </time>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-foreground/90">{body}</p>
    </li>
  );
}
