import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { FiTrash } from 'react-icons/fi';
import dayjs from 'dayjs';

// Redux
import { useSelector } from 'react-redux';

// Hooks
import { useCasts, useDeleteCast } from '../hooks/useCast';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import Table from '../components/Table';
import AddCast from '../components/AddCast';

// Discover Component
const Casts = () => {
  const { base_url } = useSelector((state) => state.config);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  const { isLoading, data: cast } = useCasts();
  const deleteCastMutation = useDeleteCast();

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'Profile Image',
      accessorKey: 'imageurl',
      cell: (info) => (
        <img
          src={`${base_url}${info.getValue()}`}
          alt={info.getValue()}
          className="w-32 h-32 rounded-md object-contain border"
        />
      ),
    },
    {
      header: 'Full Name',
      accessorKey: 'fullname',
    },
    {
      header: 'BirthDay',
      accessorKey: 'birthday',
      cell: (info) => dayjs(info.getValue()).format('MMM-DD-YYYY'),
    },
    {
      header: 'DeathDay',
      accessorKey: 'deathday',
      cell: (info) =>
        info.getValue() ? dayjs(info.getValue()).format('MMM-DD-YYYY') : null,
    },
    {
      header: '</>',
      accessorKey: '_id',
      cell: (info) => (
        <FiTrash
          size={20}
          className="text-danger cursor-pointer"
          onClick={() => deleteCastMutation.mutate(info.getValue())}
        />
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Casts</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <div className="flex flex-wrap items-center justify-between">
          <Header title="Casts" size="2" style={{ marginBottom: 0 }} />
          <AddCast />
        </div>
        <Table
          filterTitle="Search"
          data={cast}
          columns={columns}
          className="w-full"
        />
      </div>
    </>
  );
};

export default Casts;
