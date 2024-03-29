import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineClose, AiFillPlayCircle } from 'react-icons/ai';
import { BsRecordCircleFill } from 'react-icons/bs';
import dayjs from 'dayjs';

// Components
import Header from '../../Header';
import Button from '../../Button';
import AddRating from '../AddRating';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import LikeButton from './LikeButton';
import WatchLaterButton from './WatchLaterButton';
import ShareButton from './ShareButton';
import TvShows from './TvShows';

// Redux
import { useSelector } from 'react-redux';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 60%;
  padding: 4rem;
  flex: 1 1 60%;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 100%;
    flex: 1 1 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary-light);
  text-transform: uppercase;
  padding: 0.5rem 0rem;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:not(:last-child) {
    margin-right: 2rem;
  }

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.4rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const RatingsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const RatingNumber = styled.p`
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
`;

const Info = styled.div`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-primary-lighter);
  font-size: 1.3rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 2rem;
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;

  video {
    max-width: 80%;
    max-height: 80%;
    margin: auto;
    box-shadow: 0 0 5rem rgba(255, 255, 255, 0.15);

    @media ${(props) => props.theme.mediaQueries.large} {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const VideoHeader = styled.div`
  position: absolute;
  top: 0;
  left: 1%;
  right: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const MovieInfo = ({ base_url, movie }) => {
  const [modalOpen, setmodalOpen] = useState({
    type: null,
  });
  const [openSeasons, setOpenSeasons] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <MainWrapper>
      <Header
        size="2"
        title={movie.title}
        subtitle={movie.tagline}
        style={{ marginBottom: '0' }}
      />
      <div className="flex flex-wrap items-center gap-4">
        <RatingsWrapper>
          <AddRating
            id={movie._id}
            userId={currentUser._id}
            rates={movie.user_rate}
          />
          <RatingNumber>
            {Math.fround(movie.vote_average).toPrecision(2)}
          </RatingNumber>
        </RatingsWrapper>
        <Info>
          {renderInfo(
            movie.spoken_languages,
            movie.runtime,
            dayjs(movie.release_date).format('MMM-DD-YYYY')
          )}
        </Info>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <LikeButton id={movie._id} isMovieLiked={movie.isMovieLiked} />
        <ShareButton title={movie.title} />
        <WatchLaterButton id={movie._id} isWatchLater={movie.isWatchLater} />
      </div>
      <div className="space-y-2">
        <Heading>The Genres</Heading>
        <div className="flex flex-wrap items-center gap-4">
          {renderGenres(movie.genres)}
        </div>
      </div>
      <div className="space-y-2">
        <Heading>The Synopsis</Heading>
        <Text>
          {movie.overview
            ? movie.overview
            : 'There is no synopsis available...'}
        </Text>
      </div>
      <Reviews id={movie._id} reviews={movie.reviews} />
      <div className="space-y-2">
        <Heading>The Cast</Heading>
        <Cast base_url={base_url} casts={movie.cast} />
      </div>
      <div className="flex flex-wrap items-center gap-8">
        {movie.trailer && renderVideoComp('trailer')}
        {movie.type === 'Single' && movie.video && renderVideoComp('movie')}
        {movie.type === 'Series' && movie.seasons.length > 0 && (
          <Button
            title="Watch now"
            Icon={openSeasons ? AiOutlineClose : AiFillPlayCircle}
            left
            solid
            onClick={() => setOpenSeasons((prev) => !prev)}
          />
        )}
      </div>
      {movie.type === 'Series' && openSeasons && (
        <TvShows
          base_url={base_url}
          id={movie._id}
          title={movie.title}
          seasons={movie.seasons}
        />
      )}
    </MainWrapper>
  );

  function renderVideoComp(type) {
    return (
      <>
        <div onClick={() => setmodalOpen({ type })}>
          <Button title={`Watch ${type}`} Icon={AiFillPlayCircle} />
        </div>
        {modalOpen.type === type && (
          <VideoModal>
            <VideoHeader>
              <p className="text-[2.5rem]">
                {movie.title} {movie.tagline}{' '}
                {type === 'trailer' && '- trailer'}
              </p>
              <AiOutlineClose
                size={30}
                onClick={() => setmodalOpen({ type: null })}
                className="cursor-pointer"
              />
            </VideoHeader>
            <video
              src={`${base_url}/movie/${
                movie._id
              }/playMovieContent?watch=${type.toLowerCase()}`}
              controls
              autoPlay
              onLoadedData={(e) => (e.target.volume = 0.05)}
              onEnded={() => setmodalOpen({ type: null })}
            />
          </VideoModal>
        )}
      </>
    );
  }
};

// Render info of movie
function renderInfo(languages, time = null, data) {
  const info = [];
  if (languages.length !== 0) {
    languages.forEach((item) => {
      info.push(item);
    });
  }
  info.push(time, data);
  return info
    .filter((el) => el !== null)
    .map((el) => (typeof el === 'number' ? `${el} min.` : el))
    .map((el, i, array) => (i !== array.length - 1 ? `${el} / ` : el));
}

// Render Genres with links
function renderGenres(genres) {
  return genres.map((genre) => (
    <StyledLink key={genre._id} to={`/genre/${genre.name}`}>
      <BsRecordCircleFill size={10} />
      {genre.name}
    </StyledLink>
  ));
}

export default MovieInfo;
