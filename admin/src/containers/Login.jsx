import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

//Redux
import { useDispatch } from 'react-redux';
import { LoginAdmin } from '../redux/actions/admin.action';

//hooks
import useForm from '../hooks/useForm';
import { loginSchema } from '../constant/input-schema';

// Components
import Header from '../components/Header';
import Marginer from '../components/Marginer';
import Button from '../components/Button';

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin-top: 10rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  margin: auto;

  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 50%;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 70%;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    max-width: 80%;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    max-width: 90%;
  }
`;

const Text = styled.p`
  text-align: center;
  color: var(--color-primary-light);
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 2rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: italic;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { formState, handleChange, handleSubmit, hasError } = useForm(
    loginSchema,
    callback
  );

  function callback() {
    const body = {
      email: formState.values.email,
      password: formState.values.password,
    };
    dispatch(LoginAdmin(body));
  }

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
  }, []);

  return (
    <MainWrapper>
      <Helmet>
        <title>{`Login - HDMovie`}</title>
      </Helmet>
      <FormWrapper noValidate onSubmit={handleSubmit}>
        <Header title="login" size="2" />
        <label htmlFor="email">* Email Address</label>
        <input
          id="email"
          name="email"
          type="text"
          value={formState.values.email || ''}
          onChange={handleChange}
        />
        {hasError('email') && (
          <ErrorText>
            {hasError('email') ? formState.errors.email[0] : null}
          </ErrorText>
        )}
        <label htmlFor="password">* Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formState.values.password || ''}
          onChange={handleChange}
        />
        {hasError('password') && (
          <ErrorText>
            {hasError('password') ? formState.errors.password[0] : null}
          </ErrorText>
        )}
        <Marginer margin="2rem" />
        <Link
          to="/login"
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            textAlign: 'end',
          }}
        >
          Lost your account?
        </Link>
        <Marginer margin="2rem" />
        <Button
          title="Log In"
          icon="sign-in-alt"
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={!formState.isValid}
        />
        <Text>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--color-primary-dark)' }}>
            SignUp
          </Link>
        </Text>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Login;
