import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { FiTrash } from 'react-icons/fi';

// hooks
import { useGenres, useDeleteGenre } from '../hooks/useGenre';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import AddGenre from '../components/AddGenre';
import Table from '../components/Table';

// Discover Component
const Genres = () => {
  const { isLoading, data: genre } = useGenres();
  const deleteGenreMutation = useDeleteGenre();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: '</>',
      accessorKey: '_id',
      cell: (info) => (
        <FiTrash
          size={20}
          className="text-danger cursor-pointer"
          onClick={() => deleteGenreMutation.mutate(info.getValue())}
        />
      ),
    },
  ];

  // If loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Genres</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <div className="flex flex-wrap items-center justify-between">
          <Header title="Genres" size="2" style={{ marginBottom: 0 }} />
          <AddGenre />
        </div>
        <Table
          filterTitle="Search"
          data={genre}
          columns={columns}
          className="w-full"
        />
      </div>
    </>
  );
};

export default Genres;
