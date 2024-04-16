import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';

// hooks
import useTVShowFileUpload from '../../hooks/useTVShowFileUpload';
import { useMovieInfo } from '../../hooks/useMovie';

// Components
import Button from '../Button';
import Marginer from '../Marginer';
import Modal from '../Modal';

const UpdateTVShow = ({ id }) => {
  const { seasonNum } = useMovieInfo(id);
  const { progress, upload } = useTVShowFileUpload();

  const [modalOpen, setModalOpen] = useState(false);
  const [seasons, setSeasons] = useState([]);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSeasons([]);
  };
  const onNewSeasonAdd = () => {
    setSeasons((prevState) => [
      ...prevState,
      {
        name: `Season ${prevState.length + 1 + seasonNum}`,
        video: [],
      },
    ]);
  };

  const handleVideosChange = (index, value) => {
    const prevSeasons = [...seasons];
    const selectedSeason = prevSeasons.find((_, i) => i === index);
    prevSeasons[index] = {
      ...selectedSeason,
      video: [...value],
    };
    setSeasons(prevSeasons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seasons.length > 0) {
      const formData = new FormData();
      seasons.map((el) => {
        formData.append('name', el.name);
        el.video.map((video) => formData.append('video', video));
        return formData;
      });

      upload(id, formData).then(() => {
        handleClose();
      });
    }
  };

  const [disabled] = seasons.map((el) => el.video.length <= 0);

  return (
    <>
      <Button
        title="Edit TVShow"
        Icon={IoCreateOutline}
        left
        onClick={handleOpen}
      />
      <Modal
        open={modalOpen}
        size="md"
        title="Update TVShow"
        onClose={handleClose}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ float: 'left' }}>
            <Button
              title="Add New Season"
              Icon={AiOutlinePlus}
              left
              solid
              onClick={() => onNewSeasonAdd()}
            />
          </div>
          {seasons.length > 0 && (
            <>
              <Marginer margin="4rem" />
              {seasons.map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '2rem',
                  }}
                >
                  <label htmlFor={`Season${index + 1} videos`}>
                    * Season {index + 1 + seasonNum} (Videos)
                  </label>
                  <input
                    id={`Season${index + 1} videos`}
                    name={`Season${index + 1} videos`}
                    accept="video/*"
                    type="file"
                    multiple
                    onChange={(e) => handleVideosChange(index, e.target.files)}
                  />
                </div>
              ))}
            </>
          )}
          {seasons.length > 0 && (
            <Button
              title="Edit TVShow"
              Icon={IoCreateOutline}
              left
              solid
              onClick={handleSubmit}
              disabled={disabled}
            />
          )}
          {!!progress && (
            <>
              <Marginer margin="4rem" />
              <div
                style={{
                  width: `${progress}%`,
                  textAlign: 'center',
                  fontSize: '1.35rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#00b100',
                  borderRadius: '3px',
                }}
              >
                {progress}%
              </div>
            </>
          )}
          <Marginer margin="2rem" />
        </div>
      </Modal>
    </>
  );
};

export default UpdateTVShow;
