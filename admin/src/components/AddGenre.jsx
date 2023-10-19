import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';

// hooks
import { useCreateGenre } from '../hooks/useGenre';
import { useFormik } from 'formik';
import { genreSchema } from '../schemas';

// Components
import Button from './Button';
import Modal from './Modal';

const AddGenre = () => {
  const createGenreMutation = useCreateGenre();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const formAction = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: genreSchema,
    onSubmit: (values) =>
      createGenreMutation.mutate(values, { onSuccess: () => handleClose() }),
  });

  return (
    <>
      <Button
        title="Add Genre"
        Icon={IoCreateOutline}
        left
        solid
        onClick={handleOpen}
      />
      <Modal open={modalOpen} title="Add Genre" onClose={handleClose}>
        <form
          noValidate
          onSubmit={formAction.handleSubmit}
          className="max-w-full flex gap-4 flex-col mx-auto"
        >
          <div className="form-group">
            <label htmlFor="name">* Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formAction.values.name}
              onChange={formAction.handleChange}
              onBlur={formAction.handleBlur}
              autoFocus
            />
            {formAction.errors.name && formAction.touched.name && (
              <p className="form-error">{formAction.errors.name}</p>
            )}
          </div>
          <Button
            title="Submit"
            Icon={IoCreateOutline}
            left
            solid
            className="mt-4"
            disabled={createGenreMutation.isLoading}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddGenre;
