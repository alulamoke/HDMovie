import { useState, useEffect } from 'react';
import { apiV1 } from '../api';

// Redux
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/actions/alert.action';

const useMovieInfo = (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
  }, [id]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await apiV1().get(`/movie/${id}/admin`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        dispatch(setAlert(err.response.data.message, 'error'));
      }
    }
    if (id) {
      getData();
    }
  }, [id, dispatch]);

  return { loading, data, seasonNum: data && data.seasons.length };
};

export default useMovieInfo;
