import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import history from '../history';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../redux/actions/config.action';
import { logout } from '../redux/actions/admin.action';

// Components
import Loader from '../components/Loader';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';
import PersonAvatar from '../svg/person.svg';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PersonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }

  @media ${(props) => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const PersonDetails = styled.div`
  width: 60%;
  padding: 4rem;
  flex: 1 1 60%;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 40%;
  flex: 1 1 40%;
  padding: 4rem;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 60%;
    flex: 1 1 60%;
  }
`;

const ProfileImg = styled.img`
  max-height: 100%;
  height: ${(props) => (props.error ? '58rem' : 'auto')};
  object-fit: ${(props) => (props.error ? 'contain' : 'cover')};
  padding: ${(props) => (props.error ? '2rem' : '')};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${(props) =>
    props.error ? 'none' : '0rem 2rem 5rem var(--shadow-color-dark);'};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;

    @media ${(props) => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

// Discover Component
const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { base_url } = useSelector((state) => state.config);
  const { loading, currentUser } = useSelector((state) => state.admin);

  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(setSelectedMenu(pathName));
    return () => setSelectedMenu();
  }, [pathName, dispatch]);

  // If loading
  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${currentUser.fullname} - HDMovie`}</title>
      </Helmet>
      <PersonWrapper>
        {!loaded ? (
          <ImgLoading>
            <Loading />
          </ImgLoading>
        ) : null}
        <ImageWrapper style={!loaded ? { display: 'none' } : {}}>
          <ProfileImg
            src={`${base_url}${currentUser.imageurl}`}
            alt={currentUser.fullname}
            error={error ? 1 : 0}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              setError(true);
              if (e.target.src !== `${PersonAvatar}`) {
                e.target.src = `${PersonAvatar}`;
              }
            }}
          />
        </ImageWrapper>
        <PersonDetails>
          <HeaderWrapper>
            <Header size="2" title={currentUser.fullname} />
          </HeaderWrapper>
          <ButtonsWrapper>
            <LeftButtons>
              <Button title="Edit Image" left icon="edit" />
              <Button
                title="Logout"
                left
                icon="sign-out-alt"
                onClick={() => dispatch(logout())}
              />
            </LeftButtons>
            {renderBack()}
          </ButtonsWrapper>
        </PersonDetails>
      </PersonWrapper>
    </Wrapper>
  );
};

// Render back button
function renderBack() {
  if (history.action === 'PUSH') {
    return (
      <div onClick={history.goBack}>
        <Button title="Back" solid left icon="arrow-left" />
      </div>
    );
  }
}

export default Profile;
