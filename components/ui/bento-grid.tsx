import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }: { className?: string; children?: ReactNode }) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4 md:auto-rows-[13rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-purple-200/40 bg-white p-6 shadow-[0_4px_30px_-12px_rgba(23,20,31,0.15)] transition-all duration-500 hover:shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
};
