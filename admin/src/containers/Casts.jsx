import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { FiTrash } from 'react-icons/fi';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 6rem 4rem;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

// Discover Component
const Casts = () => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);
  const { base_url } = useSelector((state) => state.config);

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
          className="w-16 h-16 rounded-full object-contain border"
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
      header: 'Biography',
      accessorKey: 'biography',
    },
    {
      header: '</>',
      accessorKey: '_id',
      cell: (info) => (
        <FiTrash
          size={20}
          className="text-danger"
          onClick={() => deleteCastMutation.mutate(info.getValue())}
        />
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Casts</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <Header title="Casts" size="2" style={{ marginBottom: 0 }} />
        <AddCast />
      </div>
      <Table
        filterTitle="Search your order"
        data={cast}
        columns={columns}
        className="w-full"
      />
    </Wrapper>
  );
};

export default Casts;
