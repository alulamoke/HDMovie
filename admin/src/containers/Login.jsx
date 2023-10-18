import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { animateScroll as scroll } from 'react-scroll';
import { CiLogin } from 'react-icons/ci';
import styled from 'styled-components';

import { useFormik } from 'formik';
import { signupSchema } from '../schemas';

// React query
import { useMutation } from '@tanstack/react-query';
import { setCredentails } from '../app/authSlice';

//Redux
import { useDispatch } from 'react-redux';

// Components
import Header from '../components/Header';
import Marginer from '../components/Marginer';
import Button from '../components/Button';

import * as ROUTES from '../constant/routes';
import localStore from '../utils/localStore';

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: adminService.login,
    onSuccess: (data) => {
      dispatch(setCredentails(data));
      localStore.authenticateUser(data.token);
      toast.success('Login successful.');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  const formAction = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => loginMutation.mutate(values),
  });

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
        <div className="form-group">
          <label htmlFor="email">* Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formAction.values.email}
            onChange={formAction.handleChange}
            onBlur={formAction.handleBlur}
          />
          {formAction.errors.email && formAction.touched.email && (
            <p className="form-error">{formAction.errors.email}</p>
          )}
        </div>
        <div className="form-group"></div>
        <input
          id="password"
          name="password"
          type="password"
          value={formAction.values.password}
          onChange={formAction.handleChange}
          onBlur={formAction.handleBlur}
        />
        {formAction.errors.password && formAction.touched.password && (
          <p className="form-error">{formAction.errors.password}</p>
        )}
        <label htmlFor="password">* Password</label>
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
          Icon={CiLogin}
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={loginMutation.isLoading}
        />
        <Text>
          Don't have an account?{' '}
          <Link to="/signup" className="hover:underline">
            SignUp
          </Link>
        </Text>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Login;
