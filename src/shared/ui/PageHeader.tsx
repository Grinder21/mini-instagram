import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

type PageHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  actions?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  actionsClassName?: string;
  className?: string;
  descriptionClassName?: string;
  introClassName?: string;
  titleClassName?: string;
};

export function PageHeader({
  actions,
  actionsClassName,
  className,
  description,
  descriptionClassName,
  icon,
  introClassName,
  title,
  titleClassName,
  ...props
}: PageHeaderProps) {
  return (
    <CardHeader
      className={cn("gap-4 sm:flex-row sm:items-start sm:justify-between", className)}
      {...props}
    >
      <div className={cn("space-y-1", introClassName)}>
        <CardTitle className={cn("flex items-center gap-2 text-3xl", titleClassName)}>
          {icon}
          {title}
        </CardTitle>

        {description && (
          <CardDescription className={descriptionClassName}>
            {description}
          </CardDescription>
        )}
      </div>

      {actions && (
        <div
          className={cn(
            "flex w-full flex-col gap-2 sm:w-auto sm:flex-row",
            actionsClassName
          )}
        >
          {actions}
        </div>
      )}
    </CardHeader>
  );
}
