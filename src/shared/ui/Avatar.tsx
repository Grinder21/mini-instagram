import { useMemo, useState, type ImgHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  fallback: string;
};

function getInitials(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "?";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function Avatar({
  alt,
  className,
  fallback,
  src,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = useMemo(() => getInitials(fallback), [fallback]);
  const shouldShowImage = Boolean(src) && !imageFailed;

  return (
    <div
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-linear-to-br from-primary/20 to-primary/5 text-xs font-semibold text-primary",
        className
      )}
    >
      {shouldShowImage && (
        <img
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
          src={src}
          {...props}
        />
      )}

      {!shouldShowImage && <span>{initials}</span>}
    </div>
  );
}
