import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
//Redux
import { useDispatch } from 'react-redux';
import { SignupAdmin } from '../redux/actions/admin.action';

//hooks
import useForm from '../hooks/useForm';
import { signupSchema } from '../constant/input-schema';

// Components
import Header from '../components/Header';
import Marginer from '../components/Marginer';
import Button from '../components/Button';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
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

const Signup = () => {
  const dispatch = useDispatch();
  const { formState, handleChange, handleSubmit, hasError } = useForm(
    signupSchema,
    callback
  );

  function callback() {
    const body = {
      fullname: formState.values.fullname,
      email: formState.values.email,
      password: formState.values.password,
    };
    dispatch(SignupAdmin(body));
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
        <title>{`Signup - HDMovie`}</title>
      </Helmet>
      <FormWrapper noValidate onSubmit={handleSubmit}>
        <Header title="Signup" size="2" />
        <label htmlFor="fullname">* Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          value={formState.values.fullname || ''}
          onChange={handleChange}
        />
        {hasError('fullname') && (
          <ErrorText>
            {hasError('fullname') ? formState.errors.fullname[0] : null}
          </ErrorText>
        )}
        <label htmlFor="email">* Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
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
        <Marginer margin="3rem" />
        <Button
          title="SignUp"
          icon="sign-in-alt"
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={!formState.isValid}
        />
        <Marginer margin="3rem" />
        <Text>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary-dark)' }}>
            SignIn
          </Link>
        </Text>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Signup;
