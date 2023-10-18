import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import dayjs from 'dayjs';

// hooks
import { useMovieInfo } from '../hooks/useMovie';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCasts } from '../redux/actions/cast.action';
import { getGenres } from '../redux/actions/genre.action';
import { createMovie, updateMovieInfo } from '../redux/actions/movie.action';

// Components
import Loader from '../components/Loader';
import Button from '../components/Button';
import Header from '../components/Header';
import DropDownButton from '../components/DropDownButton';
import { langueges } from '../constant/lang';
import history from '../history';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: auto;
  margin-top: 3rem;
`;

const CreateMovie = () => {
  const location = useLocation();
  const { isLoading, data } = useMovieInfo(location.state.movieId);

  // movie states
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [poster_path, setPoster_Path] = useState(null);
  const [genres, setGenres] = useState([]);
  const [casts, setCasts] = useState([]);
  const [spoken_languages, setSpoken_Languages] = useState([]);
  const [director, setDirector] = useState('');
  const [runtime, setRuntime] = useState('');
  const [release_date, setRelease_Date] = useState('');

  const dispatch = useDispatch();
  const cast = useSelector((state) => state.cast);
  const genre = useSelector((state) => state.genre);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getCasts());
    dispatch(getGenres());
  }, [location.state.type, dispatch]);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setTitle(data.title);
      setTagline(data.tagline);
      setOverview(data.overview);
      setGenres(data.genres);
      setCasts(data.cast);
      setSpoken_Languages(data.spoken_languages);
      setDirector(data.director);
      setRuntime(data.runtime);
      setRelease_Date(dayjs(data.release_date).format('YYYY-MM-DD'));
    }
  }, [data]);

  const handleEditImage = useCallback(() => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('title', title);
    formData.append('tagline', tagline);
    formData.append('overview', overview);
    formData.append('poster_path', poster_path);
    genres.map((g, i) => formData.append(`genres[${i}]`, g));
    casts.map((c, i) => formData.append(`cast[${i}]`, c));
    spoken_languages.map((la, i) =>
      formData.append(`spoken_languages[${i}]`, la)
    );
    formData.append('director', director);
    if (runtime) formData.append('runtime', runtime);
    formData.append('release_date', release_date);
    if (location.state.type === 'Create') {
      dispatch(createMovie(formData)).then(() => {
        history.push('/movies');
      });
    } else {
      dispatch(updateMovieInfo(location.state.movieId, formData)).then(() => {
        history.push('/movies');
      });
    }
  };

  const disabled =
    location.state.type === 'Create'
      ? !type ||
        !title ||
        !poster_path ||
        !spoken_languages ||
        !genres ||
        !director ||
        !overview ||
        !release_date ||
        !casts
      : !type ||
        !title ||
        !spoken_languages ||
        !genres ||
        !director ||
        !overview ||
        !release_date ||
        !casts;

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{location.state.type} Movie</title>
      </Helmet>
      <Header title={`${location.state.type} Movie`} size="2" />
      {location.state.type === 'Edit' && isLoading ? (
        <Loader />
      ) : (
        <FormWrapper noValidate onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="type">* Type</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={location.state.type === 'Edit'}
          >
            <option disabled value="">
              Choose Type
            </option>
            <option value="Single">Single</option>
            <option value="Series">Series</option>
          </select>
          <label htmlFor="title">* Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <label htmlFor="tagline">* Tagline</label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tag Line"
          />
          <label htmlFor="overview">* Overview</label>
          <textarea
            rows="10"
            id="overview"
            name="overview"
            type="text"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="OverView"
          />
          <>
            <label htmlFor="imageInput">* Poster Path</label>
            <input
              id="imageInput"
              name="poster_path"
              accept="image/*"
              type="file"
              hidden="hidden"
              onChange={(e) => setPoster_Path(e.target.files[0])}
            />
            <Button
              title={poster_path ? 'Edit Poster image' : 'Add Poster image'}
              color={poster_path ? '#00b100' : 'var(--color-primary-dark)'}
              icon={poster_path ? 'check-circle' : 'edit'}
              left
              solid={poster_path}
              onClick={handleEditImage}
              style={{ margin: '1rem 0', justifyContent: 'center' }}
            />
          </>
          <label htmlFor="casts">* Casts</label>
          <DropDownButton
            id="casts"
            options={cast.data?.map((el) => ({
              value: el._id,
              label: el.fullname,
            }))}
            selectedOptions={casts?.map((el) => ({
              value: el._id,
              label: el.fullname,
            }))}
            onClick={setCasts}
          />
          <label htmlFor="genres">* Genres</label>
          <DropDownButton
            id="genres"
            options={genre.data?.map((el) => ({
              value: el._id,
              label: el.name,
            }))}
            selectedOptions={genres?.map((el) => ({
              value: el._id,
              label: el.name,
            }))}
            onClick={setGenres}
          />
          <label htmlFor="spoken_languages">* Spoken Languages</label>
          <DropDownButton
            id="spoken_languages"
            options={langueges.map((el) => ({
              value: el,
              label: el,
            }))}
            selectedOptions={spoken_languages?.map((el) => ({
              value: el,
              label: el,
            }))}
            onClick={setSpoken_Languages}
          />
          <label htmlFor="director">* Director</label>
          <input
            id="director"
            name="director"
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Director"
          />
          {type === 'Single' && (
            <>
              <label htmlFor="runTime">* Run Time</label>
              <input
                id="runTime"
                name="runTime"
                type="number"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                placeholder="Run Time"
              />
            </>
          )}
          <label htmlFor="release_date">* Release Date</label>
          <input
            id="release_date"
            name="release_date"
            type="date"
            value={release_date}
            onChange={(e) => setRelease_Date(e.target.value)}
            placeholder="Release Date"
          />
          <Button
            title={`${location.state.type} Movie`}
            color={
              location.state.type === 'Edit'
                ? '#1297ff'
                : 'var(--color-primary-dark)'
            }
            icon={location.state.type === 'Edit' ? 'edit' : 'plus'}
            left
            solid
            style={{ marginTop: '2rem' }}
            onClick={handleSubmit}
            disabled={disabled}
          />
        </FormWrapper>
      )}
    </Wrapper>
  );
};

export default CreateMovie;
