import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import Button from '../../Button';

import { useMutation } from '@tanstack/react-query';
import movieService from '../../../services/movie.service';

const LikeButton = ({ id, isMovieLiked }) => {
  const [toggleLiked, setToggleLiked] = useState(isMovieLiked);

  const { mutate } = useMutation({
    mutationKey: ['likedMovie', id],
    mutationFn: () => movieService.likeMovie(id),
  });

  const handleToggleLiked = () => {
    mutate(id);
    setToggleLiked((prev) => !prev);
  };

  return (
    <div onClick={handleToggleLiked}>
      <Button
        title={toggleLiked ? 'Unlike' : 'Like'}
        Icon={AiOutlineHeart}
        left
        solid={toggleLiked ? 1 : 0}
      />
    </div>
  );
};

export default LikeButton;
