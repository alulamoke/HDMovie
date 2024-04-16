import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

type TApiLoaderProps = {
  className?: string;
};

const ApiLoader: React.FC<TApiLoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <Loader2Icon className="size-5 animate-spin text-primary" />
    </div>
  );
};

export default ApiLoader;
