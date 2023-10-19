import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcEditImage } from 'react-icons/fc';
import { MdLogout } from 'react-icons/md';
import { TbArrowsExchange2 } from 'react-icons/tb';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import dayjs from 'dayjs';

// Redux
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/authSlice';
import usersService from '../services/user.service';

// Components
import Button from '../components/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PersonAvatar from '../svg/person.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6rem 4rem;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const ProfileWrapper = styled.div`
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

const ProfileDetails = styled.div`
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
  border-radius: 0.5rem;
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

const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { base_url } = useSelector((state) => state.config);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const { mutate: updateProfilePhoto } = useMutation({
    mutationKey: ['updateProfilePhoto'],
    mutationFn: usersService.editUserPhoto,
    onSuccess: () => queryClient.invalidateQueries['authState'],
  });

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: usersService.logoutInAllDevices,
    onSuccess: () => {
      dispatch(logout());
      toast.success('Logged out');
    },
  });

  const handleClick = () => {
    const fileToUploaded = document.getElementById('file-clicker');
    fileToUploaded.click();
  };

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
    updateProfilePhoto(formData);
  };

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>{`${currentUser.fullname} - HDMovie`}</title>
      </Helmet>
      <ProfileWrapper>
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
        <ProfileDetails className="space-y-12">
          <div>
            <Header
              size="2"
              title={currentUser.fullname}
              subtitle={currentUser.username}
            />
            <p className="text-2xl">Email Address: {currentUser.email}</p>
          </div>
          <hr />
          <header className="text-4xl font-semibold">Subscription</header>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium">{currentUser.plan}</h1>
              <p className="text-2xl font-medium text-green-600">
                {currentUser.paymentStatus.status}
              </p>
              <p className="text-xl font-semibold text-gray-400">
                Daysleft:{' '}
                {dayjs(currentUser.paymentStatus.duration).diff(
                  Date.now(),
                  'days'
                )}
              </p>
            </div>
            <Button title="Change Plan" Icon={TbArrowsExchange2} left solid />
          </div>
          <hr />
          <ButtonsWrapper>
            <LeftButtons>
              <input
                type="file"
                id="file-clicker"
                accept="image/*"
                hidden="hidden"
                onChange={handleChange}
              />
              <Button
                title="Edit Image"
                Icon={FcEditImage}
                left
                onClick={handleClick}
              />
              <Button
                title="Logout"
                left
                Icon={MdLogout}
                onClick={() => mutateLogout()}
              />
            </LeftButtons>
          </ButtonsWrapper>
        </ProfileDetails>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Profile;
