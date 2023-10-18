import React, { useState } from 'react';
import styled from 'styled-components';

// Redux
import { useDispatch } from 'react-redux';
import { createGenre } from '../redux/actions/genre.action';

// Components
import Button from './Button';
import Modal from './Modal';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
`;

const AddGenre = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGenre({ name })).then(() => setName(''));
  };

  return (
    <>
      <Button
        title="Add Genre"
        left
        icon="plus"
        style={{ marginLeft: '1.5rem' }}
        onClick={handleOpen}
      />

      <Modal open={modalOpen} title="Add Genre" onClose={handleClose}>
        <FormWrapper noValidate onSubmit={handleSubmit}>
          <label htmlFor="name">* Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Button
            title="Create Cast"
            left
            icon="plus"
            solid
            style={{ marginTop: '2rem' }}
          />
        </FormWrapper>
      </Modal>
    </>
  );
};

export default AddGenre;
