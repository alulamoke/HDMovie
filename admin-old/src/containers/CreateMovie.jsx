import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { IoCreateOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import dayjs from 'dayjs';

import { useFormik } from 'formik';
import { movieSchema } from '../schemas';

// hooks
import {
  useMovieInfo,
  useCreateMovie,
  useUpdateMovie,
} from '../hooks/useMovie';
import { useCasts } from '../hooks/useCast';
import { useGenres } from '../hooks/useGenre';

// Components
import Loader from '../components/Loader';
import Button from '../components/Button';
import Header from '../components/Header';
import DropDownButton from '../components/DropDownButton';
import { langueges } from '../constant/lang';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const x = searchParams.get('type');
  const y = searchParams.get('movieId');

  const createMovieMutation = useCreateMovie();
  const updateMovieMutation = useUpdateMovie();

  const { isLoading, data } = useMovieInfo(y);
  const { data: cast } = useCasts();
  const { data: genre } = useGenres();

  const [poster_path, setPoster_Path] = useState(null);
  const [genres, setGenres] = useState([]);
  const [casts, setCasts] = useState([]);
  const [spoken_languages, setSpoken_Languages] = useState([]);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      formAction.setValues({
        type: data.type,
        title: data.title,
        tagline: data.tagline,
        overview: data.overview,
        director: data.director,
        runtime: data.runtime,
        release_date: dayjs(data.release_date).format('YYYY-MM-DD'),
      });
      setGenres(data.genres);
      setCasts(data.cast);
      setSpoken_Languages(data.spoken_languages);
    }
  }, [data]);

  const handleEditImage = useCallback(() => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }, []);

  const formAction = useFormik({
    initialValues: {
      type: '',
      title: '',
      tagline: '',
      overview: '',
      director: '',
      runtime: 0,
      release_date: '',
    },
    validationSchema: movieSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append('type', values.type);
      formData.append('title', values.title);
      formData.append('tagline', values.tagline);
      formData.append('overview', values.overview);
      formData.append('poster_path', poster_path);
      genres.map((g, i) => formData.append(`genres[${i}]`, g));
      casts.map((c, i) => formData.append(`cast[${i}]`, c));
      spoken_languages.map((la, i) =>
        formData.append(`spoken_languages[${i}]`, la)
      );
      formData.append('director', values.director);
      if (values.runtime) formData.append('runtime', values.runtime);
      formData.append('release_date', values.release_date);

      if (x === 'Create') {
        createMovieMutation.mutate(formData, {
          onSuccess: () => navigate('/movies'),
        });
      } else {
        updateMovieMutation.mutate(
          { y, formData },
          { onSuccess: () => navigate('/movies') }
        );
      }
    },
  });

  if (isLoading && x === 'Edit') {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{x} Movie</title>
      </Helmet>
      <div className="flex flex-col gap-8 py-24 px-16">
        <Header title={`${x} Movie`} size="2" />
        <form
          noValidate
          onSubmit={formAction.handleSubmit}
          className="flex flex-col gap-4 max-w-screen-lg w-full mx-auto"
        >
          <div className="form-group">
            <label htmlFor="type">* Type</label>
            <select
              id="type"
              name="type"
              value={formAction.values.type}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
              disabled={x === 'Edit'}
            >
              <option disabled value="">
                Choose Type
              </option>
              <option value="Single">Single</option>
              <option value="Series">Series</option>
            </select>
            {formAction.errors.type && formAction.touched.type && (
              <p className="form-error">{formAction.errors.type}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="title">* Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formAction.values.title}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.title && formAction.touched.title && (
              <p className="form-error">{formAction.errors.title}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="tagline">* Tagline (Optional)</label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              value={formAction.values.tagline}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.tagline && formAction.touched.tagline && (
              <p className="form-error">{formAction.errors.tagline}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="overview">* Overview</label>
            <textarea
              id="overview"
              name="overview"
              type="text"
              rows={5}
              value={formAction.values.overview}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.overview && formAction.touched.overview && (
              <p className="form-error">{formAction.errors.overview}</p>
            )}
          </div>
          <div className="form-group">
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
              Icon={RiImageAddLine}
              left
              solid={poster_path}
              onClick={handleEditImage}
            />
            {poster_path ? (
              <img
                src={URL.createObjectURL(poster_path)}
                alt="movie poster"
                className="w-full h-[35rem] object-contain border rounded-md mt-8"
              />
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="casts">* Casts</label>
            <DropDownButton
              id="casts"
              options={cast?.map((el) => ({
                value: el._id,
                label: el.fullname,
              }))}
              selectedOptions={casts?.map((el) => ({
                value: el._id,
                label: el.fullname,
              }))}
              onClick={setCasts}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genres">* Genres</label>
            <DropDownButton
              id="genres"
              options={genre?.map((el) => ({
                value: el._id,
                label: el.name,
              }))}
              selectedOptions={genres?.map((el) => ({
                value: el._id,
                label: el.name,
              }))}
              onClick={setGenres}
            />
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label htmlFor="director">* Director</label>
            <input
              id="director"
              name="director"
              type="text"
              value={formAction.values.director}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.director && formAction.touched.director && (
              <p className="form-error">{formAction.errors.director}</p>
            )}
          </div>
          {formAction.values.type === 'Single' && (
            <div className="form-group">
              <label htmlFor="runtime">* Run Time</label>
              <input
                id="runtime"
                name="runtime"
                type="number"
                value={formAction.values.runtime}
                onChange={formAction.handleChange}
                onBlur={formAction.handleBlur}
              />
              {formAction.errors.runtime && formAction.touched.runtime && (
                <p className="form-error">{formAction.errors.runtime}</p>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="release_date">* Release Date</label>
            <input
              id="release_date"
              name="release_date"
              type="date"
              value={formAction.values.release_date}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.release_date &&
              formAction.touched.release_date && (
                <p className="form-error">{formAction.errors.release_date}</p>
              )}
          </div>
          <Button
            title={`${x} Movie`}
            color={x === 'Edit' ? '#1297ff' : 'var(--color-primary-dark)'}
            Icon={IoCreateOutline}
            left
            solid
            disabled={
              !poster_path ||
              !casts.length ||
              !genres.length ||
              !spoken_languages.length
            }
          />
        </form>
      </div>
    </>
  );
};

export default CreateMovie;
