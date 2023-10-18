import { useState, useRef } from 'react';
import { IoCreateOutline } from 'react-icons/io5';

// hooks
import { useCreateCast } from '../hooks/useCast';
import { useFormik } from 'formik';
import { castSchema } from '../schemas';

// Components
import Button from './Button';
import Modal from './Modal';

const AddCast = () => {
  const createCastMutation = useCreateCast();

  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const formAction = useFormik({
    initialValues: {
      fullname: '',
      birthday: '',
      deathday: '',
      biography: '',
    },
    validationSchema: castSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append('fullname', values.fullname);
      formData.append('imageurl', image);
      formData.append('birthday', values.birthday);
      if (values.deathday) formData.append('deathday', values.deathday);
      formData.append('biography', values.biography);

      createCastMutation.mutate(formData);
    },
  });

  return (
    <>
      <Button
        title="Add Cast"
        Icon={IoCreateOutline}
        left
        onClick={handleOpen}
      />
      <Modal open={modalOpen} title="Add Cast" onClose={handleClose}>
        <form
          noValidate
          onSubmit={formAction.handleSubmit}
          className="max-w-full flex gap-4 flex-col mx-auto"
        >
          <div className="form-group">
            <label htmlFor="fullname">* Fullname</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={formAction.values.fullname}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.fullname && formAction.touched.fullname && (
              <p className="form-error">{formAction.errors.fullname}</p>
            )}
          </div>
          <label htmlFor="imageInput">* Image</label>
          <input
            ref={fileRef}
            name="image"
            accept="image/*"
            type="file"
            hidden="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            title={image ? 'Edit Image' : 'Add Image'}
            color={image ? '#00b100' : 'var(--color-primary-dark)'}
            Icon={IoCreateOutline}
            left
            solid={image}
            onClick={fileRef.current.click()}
          />
          <div className="form-group">
            <label htmlFor="birthday">* Birthday</label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={formAction.values.birthday}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.birthday && formAction.touched.birthday && (
              <p className="form-error">{formAction.errors.birthday}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="deathday">* Deathday</label>
            <input
              id="deathday"
              name="deathday"
              type="date"
              value={formAction.values.deathday}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.deathday && formAction.touched.deathday && (
              <p className="form-error">{formAction.errors.deathday}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="biography">* Biography</label>
            <textarea
              id="biography"
              name="biography"
              type="text"
              value={formAction.values.biography}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
            />
            {formAction.errors.biography && formAction.touched.biography && (
              <p className="form-error">{formAction.errors.biography}</p>
            )}
          </div>
          <Button
            title="Submit"
            Icon={IoCreateOutline}
            left
            solid
            className="mt-4"
            disabled={createCastMutation.isLoading}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddCast;
