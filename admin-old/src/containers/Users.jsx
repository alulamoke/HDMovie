import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { FiTrash } from 'react-icons/fi';
import dayjs from 'dayjs';

// Redux
import { useSelector } from 'react-redux';

// hooks
import { useUsers } from '../hooks/useUser';

// Components
import Loader from '../components/Loader';
import Header from '../components/Header';
import Table from '../components/Table';

// Discover Component
const Users = () => {
  const { base_url } = useSelector((state) => state.config);
  const { isLoading, data: user } = useUsers();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'Profile Image',
      accessorKey: 'imageurl',
      cell: (info) => (
        <img
          src={`${base_url}${info.getValue()}`}
          alt={info.getValue()}
          className="w-24 h-24 object-contain shrink-0"
        />
      ),
    },
    {
      header: 'Full Name',
      accessorKey: 'fullname',
    },
    {
      header: 'Email Address',
      accessorKey: 'email',
    },
    {
      header: 'Subscription',
      accessorKey: 'plan',
      cell: (info) => <p className="text-green-500">{info.getValue()}</p>,
    },
    {
      header: 'Joined',
      accessorKey: 'createdAt',
      cell: (info) => <>{dayjs(info.getValue()).format('MMM DD YYYY')}</>,
    },
    {
      header: '</>',
      accessorKey: '_id',
      cell: () => <FiTrash size={15} className="text-danger cursor-pointer" />,
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
        <title>Users</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <Header title="users" size="2" />
        <Table
          filterTitle="Search"
          data={user}
          columns={columns}
          className="w-full"
        />
      </div>
    </>
  );
};

export default Users;
