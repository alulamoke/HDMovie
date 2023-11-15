import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Stars from 'react-rating';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

// Redux
import { useMutation, useQueryClient } from '@tanstack/react-query';
import movieService from '../../services/movie.service';

const RatingsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const StarsWrapper = styled(Stars)`
  line-height: 1;
  position: relative;
`;

const OutlineHeartIcons = styled(AiOutlineStar)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

const FullHeartIcons = styled(AiFillStar)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 10rem;
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

const AddRating = ({ id, userId, rates }) => {
  const queryClient = useQueryClient();
  const [currentValue, setCurrentValue] = useState(0);

  const { mutate } = useMutation({
    mutationKey: ['RateMovie', id],
    mutationFn: movieService.rateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie', id] });
      toast.success('Movie Rated.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isUserRateIsMovie = rates.find((el) => el.user === userId);
  const initialRating = isUserRateIsMovie ? isUserRateIsMovie.value : 0;

  return (
    <RatingsWrapper>
      <StarsWrapper
        emptySymbol={<OutlineHeartIcons size={20} />}
        fullSymbol={<FullHeartIcons size={20} />}
        initialRating={initialRating}
        fractions={4}
        onHover={(e) => setCurrentValue(e)}
        onClick={(value) => mutate({ id, value })}
      />
      <Tooltip>{currentValue}</Tooltip>
    </RatingsWrapper>
  );
};

export default AddRating;
