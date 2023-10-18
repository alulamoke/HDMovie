import { Bar } from 'react-chartjs-2';

// hooks
import { useMovies } from '../../hooks/useMovie';

// Components
import Loading from '../Loading';

const BestMovieChart = () => {
  const { isLoading, data: movies } = useMovies();

  const labels = movies && movies.slice(0, 10).map((el) => el.title);
  const data_number = movies && movies.map((el) => el.likes.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Top 10 Movies or Series',
        data: data_number,
        backgroundColor: [
          '#00b100',
          '#1297ff',
          '#e20c0c',
          '#ff9800',
          '#7334ef',
          '#12bfde',
          '#e907d6',
          '#5f1b1b',
          '#546e7a',
          '#131625',
        ],
      },
    ],
  };

  if (isLoading) return <Loading />;
  return <Bar data={data} />;
};

export default BestMovieChart;
