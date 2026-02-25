import type { ComponentProps } from "react";

import { LoaderIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <LoaderIcon
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      role="status"
      {...props}
    />
  );
}

export function SpinnerLoader() {
  return (
    <div className="flex min-h-24 items-center justify-center">
      <Spinner />
    </div>
  );
}
