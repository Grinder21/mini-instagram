import type { FormHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export function Form({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("space-y-4", className)} {...props} />;
}
