import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { PlusIcon } from "lucide-react";

import { useGenres } from "@/hooks/useData";
import { useNewGenreModal } from "@/hooks/modals/use-new-genre";

import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import ApiLoader from "@/components/loading/ApiLoader";
import { DataTable } from "@/components/data-table";
import { GenresColumn } from "@/components/data-table/genres/GenresColumn";

const Genres = () => {
  const newGenreModal = useNewGenreModal();
  const { isLoading, data } = useGenres();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO title="HDMovie-Genres" />
      <div className="space-y-8 rounded-md border bg-background p-4 md:p-8">
        <div className="flex flex-wrap justify-between gap-4">
          <header className="text-xl font-semibold">Genres</header>
          <Button className="gap-2" onClick={() => newGenreModal.onOpen()}>
            <PlusIcon className="size-4" />
            New Genre
          </Button>
        </div>
        {isLoading ? (
          <ApiLoader />
        ) : (
          <DataTable data={data} columns={GenresColumn} seachType="name" />
        )}
      </div>
    </>
  );
};

export default Genres;
