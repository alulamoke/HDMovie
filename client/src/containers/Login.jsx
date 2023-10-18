import { Helmet } from 'react-helmet';
import { MdLogin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

// Components
import Button from '../components/Button';
import Header from '../components/Header';
import Marginer from '../components/Marginer';

import { useDispatch } from 'react-redux';
import { setCredentails } from '../app/authSlice';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas';
import usersService from '../services/user.service';
import localStore from '../utils/localStore';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: hidden;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;

  @media ${(props) => props.theme.mediaQueries.large} {
    width: 50%;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 70%;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    width: 80%;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    width: 90%;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: usersService.login,
    onSuccess: (data) => {
      dispatch(setCredentails(data));
      localStore.authenticateUser(data.token);
      navigate('/discover/popular');
      toast.success('Login success');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const formAction = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <MainWrapper>
      <Helmet>
        <title>{`Login - HDMovie`}</title>
      </Helmet>
      <Marginer direction="vertical" margin="5rem" />
      <FormWrapper noValidate onSubmit={formAction.handleSubmit}>
        <Header title="login" size="2" />
        <label htmlFor="username">* Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formAction.values.username}
          onChange={formAction.handleChange}
          onBlur={formAction.handleBlur}
        />
        {formAction.errors.username && formAction.touched.username && (
          <ErrorText>{formAction.errors.username}</ErrorText>
        )}
        <label htmlFor="password">* Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formAction.values.password}
          onChange={formAction.handleChange}
          onBlur={formAction.handleBlur}
        />
        {formAction.errors.password && formAction.touched.password && (
          <ErrorText>{formAction.errors.password}</ErrorText>
        )}
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
        <Marginer margin="3rem" />
        <Button
          type="submit"
          title="Log In"
          Icon={MdLogin}
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={isLoading}
        />
        <Text>
          Don't have an account?{' '}
          <Link
            to="/pricing-plan"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            SignUp
          </Link>
        </Text>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Login;
