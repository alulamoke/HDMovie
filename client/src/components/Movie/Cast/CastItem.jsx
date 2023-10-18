import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PersonAvatar from '../../../svg/person.svg';

const LinkWrapper = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.loaded ? '1' : '0')};
  visibility: ${(props) => (props.loaded ? 'visible' : 'hidden')};
`;

const MovieImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const CastItem = ({ base_url, person }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <LinkWrapper to={`/cast/${person._id}`} loaded={loaded ? 1 : 0}>
      <MovieImg
        src={`${base_url}${person.imageurl}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          if (e.target.src !== `${PersonAvatar}`) {
            e.target.src = `${PersonAvatar}`;
          }
        }}
      />
    </LinkWrapper>
  );
};

export default CastItem;
