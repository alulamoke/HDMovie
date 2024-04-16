import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

type TNoContentProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export const NoContent: React.FC<TNoContentProps> = ({
  title,
  subtitle,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "mx-auto grid size-full max-w-screen-sm place-items-center",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 rounded-md border bg-background p-4 text-center shadow-sm">
        <h1 className="text-3xl">{title}</h1>
        <p className="text-sm">{subtitle}</p>
        <Button variant="link" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="size-4" />
          Go back
        </Button>
      </div>
    </div>
  );
};
