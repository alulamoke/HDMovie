import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { FiTrash } from 'react-icons/fi';
import styled from 'styled-components';

// hooks
import useMovieFileUpload from '../../hooks/useMovieFileUpload';
import { useDeleteMovie } from '../../hooks/useMovie';

// Components
import Loading from '../Loading';
import Button from '../Button';
import Rating from './Rating';
import Modal from '../Modal';
import UpdateTVShow from './UpdateTVShow';
import NothingSvg from '../../svg/nothing.svg';

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: 38rem;
  object-fit: ${(props) => (props.error ? 'contain' : 'cover')};
  border-radius: 0.8rem;
  padding: ${(props) => (props.error ? '2rem' : '')};
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${MovieWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
    box-shadow: none;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const ImgLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${MovieWrapper}:hover & {
    color: var(--text-color);
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

const RatingsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);

  ${MovieWrapper}:hover & {
    color: var(--color-primary-lighter);
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
  background-color: var(--color-primary-light);
  color: var(--text-color);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 999;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-color: var(--color-primary-light) transparent transparent transparent;
  }

  ${RatingsWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

// Function to render list of movies
const MovieItem = ({ base_url, movie }) => {
  const deleteMovieMutation = useDeleteMovie();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEditTrailer = () => {
    const fileInput = document.getElementById('trailerInput');
    fileInput.click();
  };

  const handleEditVideo = () => {
    const fileInput = document.getElementById('videoInput');
    fileInput.click();
  };

  // Custom hooks for uploading video, trailer and tvshow
  const { progress, upload } = useMovieFileUpload();

  const handleTrailerChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('trailer', file);

    if (file)
      upload('/updateTrailer', movie._id, formData).then(() => {
        handleClose();
      });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('video', file);

    if (file)
      upload('/updateVideo', movie._id, formData).then(() => {
        handleClose();
      });
  };

  useEffect(() => {
    return () => setLoaded(false);
  }, []);

  return (
    <>
      <MovieWrapper onClick={handleOpen}>
        {!loaded ? (
          <ImgLoading>
            <Loading />
          </ImgLoading>
        ) : null}
        <MovieImg
          src={`${base_url}${movie.poster_path}`}
          alt={movie.title}
          error={error ? 1 : 0}
          onLoad={() => setLoaded(true)}
          style={!loaded ? { display: 'none' } : {}}
          onError={(e) => {
            setError(true);
            if (e.target.src !== `${NothingSvg}`) {
              e.target.src = `${NothingSvg}`;
            }
          }}
        />
        <DetailsWrapper>
          <Title>{movie.title}</Title>
          <RatingsWrapper>
            <Rating number={movie.vote_average} />
            <Tooltip>
              {movie.vote_average * 2} average rating on{' '}
              {movie.user_rate.length} votes
            </Tooltip>
          </RatingsWrapper>
        </DetailsWrapper>
      </MovieWrapper>
      <Modal
        open={modalOpen}
        size="md"
        title="Edit Movie"
        onClose={handleClose}
      >
        <input
          accept="video/*"
          type="file"
          id="trailerInput"
          hidden="hidden"
          onChange={handleTrailerChange}
        />
        <input
          accept="video/*"
          type="file"
          id="videoInput"
          hidden="hidden"
          onChange={handleVideoChange}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: '4rem 0',
          }}
        >
          <Link to={`/create-movie?type=Edit&movieId=${movie._id}`}>
            <Button
              title="Edit Movie Info"
              color="#1297ff"
              Icon={IoCreateOutline}
              left
              solid
            />
          </Link>
          <Button
            title={
              movie.trailer ? 'Edit Movie (Trailer)' : 'Add Movie (Trailer)'
            }
            color={movie.trailer && '#00b100'}
            Icon={AiOutlineVideoCameraAdd}
            left
            solid={movie.trailer}
            onClick={handleEditTrailer}
          />
          {movie.type === 'Single' ? (
            <Button
              title={movie.video ? 'Edit Movie (Video)' : 'Add Movie (Video)'}
              color={movie.video && '#00b100'}
              Icon={AiOutlineVideoCameraAdd}
              left
              solid={movie.video}
              onClick={handleEditVideo}
            />
          ) : (
            <UpdateTVShow id={movie._id} />
          )}
          <Button
            title="Delete Movie"
            color="#e20c0c"
            Icon={FiTrash}
            left
            solid
            onClick={() =>
              deleteMovieMutation.mutate(movie._id, {
                onSuccess: () => handleClose(),
              })
            }
          />
        </div>
        {!!progress && (
          <div
            style={{
              width: `${progress}%`,
              textAlign: 'center',
              fontSize: '1.35rem',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#00b100',
              borderRadius: '3px',
              marginBottom: '2rem',
            }}
          >
            {progress}%
          </div>
        )}
      </Modal>
    </>
  );
};

export default MovieItem;
