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
import adminService from '../services/admin.service';

// Components
import Header from '../components/Header';
import Marginer from '../components/Marginer';
import Button from '../components/Button';

import * as ROUTES from '../constant/routes';

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

const Signup = () => {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: adminService.signup,
    onSuccess: () => {
      toast.success('Account created successfully, Login now.');
      navigate(ROUTES.LOGIN);
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
    onSubmit: (values) => signupMutation.mutate(values),
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
        <title>{`Signup - HDMovie`}</title>
      </Helmet>
      <FormWrapper noValidate onSubmit={formAction.handleSubmit}>
        <Header title="Signup" size="2" />
        <div className="form-group">
          <label htmlFor="fullname">* Full Name</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={formAction.values.fullname}
            onChange={formAction.handleChange}
            onBlur={formAction.handleBlur}
          />
          {formAction.errors.fullname && formAction.touched.fullname && (
            <p className="form-error">{formAction.errors.fullname}</p>
          )}
        </div>
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
        <div className="form-group">
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
            <p className="form-error">{formAction.errors.password}</p>
          )}
        </div>
        <Marginer margin="3rem" />
        <Button
          title="SignUp"
          Icon={CiLogin}
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={signupMutation.isLoading}
        />
        <Marginer margin="3rem" />
        <Text>
          Already have an account?{' '}
          <Link to="/login" className="hover:underline">
            SignIn
          </Link>
        </Text>
      </FormWrapper>
    </MainWrapper>
  );
};

export default Signup;
