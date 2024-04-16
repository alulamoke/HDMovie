import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { appApi } from '../app/appApi';

const useMovieFileUpload = () => {
  const [progress, setProgress] = useState(0);

  async function upload(url, id, body) {
    try {
      const res = await appApi().put(`/movie/${url}/${id}`, body, {
        onUploadProgress: (progressEvent) =>
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          ),
      });
      toast.success(`${res.data.title} movie updated.`);
      setProgress(0);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return { progress, setProgress, upload };
};

export default useMovieFileUpload;
