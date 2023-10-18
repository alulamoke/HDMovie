import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

// Redux
import { useDispatch } from 'react-redux';
import { createCast } from '../redux/actions/cast.action';

// Components
import Button from './Button';
import Modal from './Modal';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
`;

const AddCast = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [fullname, setFullName] = useState('');
  const [image, setImage] = useState(null);
  const [birthday, setBirthday] = useState('');
  const [deathday, setDeathday] = useState('');
  const [biography, setBiography] = useState('');

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEditImage = useCallback(() => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('imageurl', image);
    formData.append('birthday', birthday);
    if (deathday) formData.append('deathday', deathday);
    formData.append('biography', biography);
    dispatch(createCast(formData)).then(() => {
      handleClose();
    });
  };

  return (
    <>
      <Button
        title="Add Cast"
        left
        icon="plus"
        style={{ marginLeft: '1.5rem' }}
        onClick={handleOpen}
      />
      <Modal open={modalOpen} title="Add Cast" onClose={handleClose}>
        <FormWrapper noValidate onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="fullname">* Fullname</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Name"
          />
          {fullname && (
            <>
              <label htmlFor="imageInput">* Image</label>
              <input
                id="imageInput"
                name="image"
                accept="image/*"
                type="file"
                hidden="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button
                title={image ? 'Edit Image' : 'Add Image'}
                color={image ? '#00b100' : 'var(--color-primary-dark)'}
                icon={image ? 'check-circle' : 'edit'}
                left
                solid={image}
                onClick={handleEditImage}
                style={{ margin: '1rem 0' }}
              />
            </>
          )}
          {image && (
            <>
              <label htmlFor="birthday">* Birthday</label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </>
          )}
          {birthday && (
            <>
              <label htmlFor="deathday">* Deathday</label>
              <input
                id="deathday"
                name="deathday"
                type="date"
                value={deathday}
                onChange={(e) => setDeathday(e.target.value)}
              />
            </>
          )}
          {(birthday || deathday) && (
            <>
              <label htmlFor="biography">* Biography</label>
              <textarea
                id="biography"
                name="biography"
                type="text"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                placeholder="Biography"
              />
            </>
          )}
          <Button
            title="Create Cast"
            left
            icon="plus"
            solid
            style={{ marginTop: '2rem' }}
            onClick={handleSubmit}
            disabled={!fullname || !image || !birthday || !biography}
          />
        </FormWrapper>
      </Modal>
    </>
  );
};

export default AddCast;
