import React from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import Button from '../../Button';

//hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { reviewSchema } from '../../../schemas';
import movieService from '../../../services/movie.service';

const ErrorText = styled.p`
  color: red;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: italic;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const AddReview = ({ id, base_url, currentUser }) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ['addReview', id],
    mutationFn: (body) => movieService.addReview(id, body),
    onSuccess: () => {
      toast.success('Review added successfully');
      queryClient.invalidateQueries(['movie', id]);
    },
    onError: (err) => toast.error(err.message),
  });

  const formAction = useFormik({
    initialValues: {
      review: '',
    },
    validationSchema: reviewSchema,
    onSubmit: (values, actions) => {
      mutate(values);
      actions.resetForm();
    },
  });

  return (
    <form noValidate onSubmit={formAction.handleSubmit}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <img
          src={`${base_url}${currentUser.imageurl}`}
          alt={currentUser.fullname}
          style={{
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '2rem',
          }}
        />
        <textarea
          name="review"
          placeholder="What's on your mind?"
          value={formAction.values.review}
          onChange={formAction.handleChange}
          onBlur={formAction.handleBlur}
        />
      </div>
      {formAction.errors.review && formAction.touched.review && (
        <ErrorText>{formAction.errors.review}</ErrorText>
      )}
      <Button
        title="Submit"
        Icon={MdOutlineAdd}
        left
        solid
        style={{ float: 'right' }}
        disabled={isLoading}
      />
    </form>
  );
};

export default AddReview;
