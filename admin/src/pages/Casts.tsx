import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { PlusIcon } from "lucide-react";

import { useCasts } from "@/hooks/useData";

import { SEO } from "@/components/SEO";
import ApiLoader from "@/components/loading/ApiLoader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { CastsColumn } from "@/components/data-table/casts/CastsColumn";

const Casts = () => {
  const { isLoading, data } = useCasts();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO title="HDMovie-Casts" />
      <div className="space-y-8 rounded-md border bg-background p-4 md:p-8">
        <div className="flex flex-wrap justify-between gap-4">
          <header className="text-xl font-semibold">Casts</header>
          <Button className="gap-2">
            <PlusIcon className="size-4" />
            New Cast
          </Button>
        </div>
        {isLoading ? (
          <ApiLoader />
        ) : (
          <DataTable data={data} columns={CastsColumn} seachType="fullname" />
        )}
      </div>
    </>
  );
};

export default Casts;
