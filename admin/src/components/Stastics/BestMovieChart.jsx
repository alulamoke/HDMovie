import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getMoviesForAdmin,
  clearMovies,
} from '../../redux/actions/movie.action';

// Components
import Loading from '../Loading';

const BestMovieChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesForAdmin(1, 'likes.desc'));
    return () => clearMovies();
  }, [dispatch]);

  const movies = useSelector((state) => state.movie);

  const labels = movies.data && movies.data.slice(0, 10).map((el) => el.title);
  const data_number = movies.data && movies.data.map((el) => el.likes.length);

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

  if (movies.leading) return <Loading />;
  return <Bar data={data} />;
};

export default BestMovieChart;
