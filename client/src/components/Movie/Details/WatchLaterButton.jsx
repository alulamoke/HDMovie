import React, { useState } from 'react';
import { AiOutlineHistory } from 'react-icons/ai';
import Button from '../../Button';

import { useMutation } from '@tanstack/react-query';
import movieService from '../../../services/movie.service';

const WatchLaterButton = ({ id, isWatchLater }) => {
  const [toggleWatchLater, setToggleWatchLater] = useState(isWatchLater);

  const { mutate } = useMutation({
    mutationKey: ['watchLater', id],
    mutationFn: () => movieService.watchLater(id),
  });

  const handleToggleWatchLater = () => {
    mutate(id);
    setToggleWatchLater((prev) => !prev);
  };

  return (
    <div onClick={handleToggleWatchLater}>
      <Button
        title={toggleWatchLater ? 'Remove from watchLater' : 'Watch Later'}
        Icon={AiOutlineHistory}
        left
        solid={toggleWatchLater ? 1 : 0}
      />
    </div>
  );
};

export default WatchLaterButton;
