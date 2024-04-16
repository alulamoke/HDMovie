import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { appApi } from '../app/appApi';

const useTVShowFileUpload = () => {
  const [progress, setProgress] = useState(0);

  async function upload(id, body) {
    try {
      const res = await appApi().put(`/movie/updateSeriesMovie/${id}`, body, {
        onUploadProgress: (progressEvent) =>
          setProgress(
            parseInt(
              Math.fround((progressEvent.loaded * 100) / progressEvent.total)
            )
          ),
      });
      toast.success(`${res.data.title} Series updated.`);
      setProgress(0);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return { progress, setProgress, upload };
};

export default useTVShowFileUpload;
