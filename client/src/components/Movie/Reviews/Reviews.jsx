import dayjs from 'dayjs';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';

// Components
import Button from '../../Button';
import NoContent from '../../NoContent';
import AddReview from './AddReview';

// Redux
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import movieService from '../../../services/movie.service';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;

  .modal-component {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    width: 60%;
    min-height: auto;
    margin: auto;
    box-shadow: 0.3rem 0.5rem 0.7rem rgba(0, 0, 0, 0.5);
    overflow-y: auto;

    @media ${(props) => props.theme.mediaQueries.large} {
      width: 80%;
    }

    @media ${(props) => props.theme.mediaQueries.medium} {
      width: 100%;
      height: 100%;
    }
  }
`;

const Reviews = ({ id, reviews }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const { base_url } = useSelector((state) => state.config);
  const { currentUser } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['deleteReview', id],
    mutationFn: (reviewId) => movieService.deleteSpecificReview(id, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(['movie', id]);
      toast.success('Review deleted');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  return (
    <React.Fragment>
      <Button
        title={
          reviews.length > 0
            ? `See all ${reviews.length} reviews`
            : 'Add Review'
        }
        Icon={AiOutlinePlus}
        left
        onClick={handleOpen}
      />
      {modalOpened && (
        <ModalWrapper>
          <div className="modal-component">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '3rem',
              }}
            >
              <h1>Reviews</h1>
              <AiOutlineClose
                size={50}
                style={{ cursor: 'pointer' }}
                onClick={handleClose}
              />
            </div>
            <AddReview id={id} base_url={base_url} currentUser={currentUser} />
            <div style={{ padding: '1rem 2rem' }}>
              {reviews.length > 0 ? (
                reviews.map((el) => (
                  <div
                    key={el._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',

                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={`${base_url}${el.user.imageurl}`}
                      alt={el.user.fullname}
                      style={{
                        width: '6rem',
                        height: '6rem',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '2rem',
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <p style={{ fontSize: '1.45rem', fontWeight: 'bold' }}>
                        {el.user.fullname}
                      </p>
                      <p style={{ fontSize: '1.3rem', fontWeight: '500' }}>
                        {el.review} -{' '}
                        <strong>
                          {dayjs(el.createdAt).format('MMM-DD-YYYY')}
                        </strong>
                      </p>
                    </div>
                    <AiOutlineClose
                      size={40}
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => mutate(el._id)}
                    />
                  </div>
                ))
              ) : (
                <NoContent
                  title="Sorry!"
                  subtitle={`There are no reviews yet...`}
                />
              )}
            </div>
          </div>
        </ModalWrapper>
      )}
    </React.Fragment>
  );
};

export default Reviews;
