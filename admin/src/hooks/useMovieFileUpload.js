import { useState } from 'react';
import { apiV1 } from '../api';

// Redux
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/actions/alert.action';

const useMovieFileUpload = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  async function upload(url, id, body) {
    try {
      const res = await apiV1().put(`/movie/${url}/${id}`, body, {
        onUploadProgress: (progressEvent) =>
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          ),
      });
      dispatch(setAlert(`${res.data.title} movie updated.`, 'success'));
      setProgress(0);
    } catch (err) {
      dispatch(setAlert(err.response.data.message, 'error'));
    }
  }

  return { progress, setProgress, upload };
};

export default useMovieFileUpload;
