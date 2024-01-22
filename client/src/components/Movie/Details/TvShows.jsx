import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '../../Button';
import Header from '../../Header';

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;

  video {
    max-width: 80%;
    max-height: 80%;
    margin: auto;
    box-shadow: 0 0 5rem rgba(255, 255, 255, 0.15);

    @media ${(props) => props.theme.mediaQueries.large} {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const VideoTitle = styled.p`
  position: absolute;
  top: 0;
  left: 1%;
  font-size: 2.25rem;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 1%;
  right: 1%;
  cursor: pointer;
`;

const TvShows = ({ base_url, id, title, seasons }) => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Header title="Seasons" />
      {seasons.map((el) => {
        return (
          <div key={el._id} style={{ marginBottom: '2rem' }}>
            <Heading>{el.name}</Heading>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                padding: '1rem',
              }}
            >
              {el.video.map((item, i) =>
                renderVideo(title, el.name, item, i + 1)
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  function renderVideo(movieName, seasonName, videoName, episode) {
    return (
      <React.Fragment key={episode}>
        <Button
          title={episode}
          onClick={() => setOpen(videoName)}
          style={{ marginRight: '1rem' }}
        />
        {open === videoName && (
          <VideoModal>
            <VideoTitle>{`${movieName}.${seasonName}.Episode ${episode}`}</VideoTitle>
            <CloseIcon size={30} onClick={() => setOpen(null)} />
            <video
              controls
              autoPlay
              src={`${base_url}/movie/${id}/playSeriesContent?season=${seasonName}&episode=${episode}`}
              alt={videoName}
              onLoadedData={(e) => (e.target.volume = 0.05)}
              onEnded={() => setOpen(null)}
            />
          </VideoModal>
        )}
      </React.Fragment>
    );
  }
};

export default TvShows;
