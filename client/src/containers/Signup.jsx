import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdLogin } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { signupSchema } from '../schemas';
import usersService from '../services/user.service';

// Components
import Button from '../components/Button';
import Marginer from '../components/Marginer';
import { currencyFormatter } from '../utils/currencyFormatter';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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

const ErrorText = styled.p`
  color: red;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: italic;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const PlanName = searchParams.get('name') ?? 'Free Trail';
  const PlanPrice = searchParams.get('price') ?? '0.0';

  const paymentMutation = useMutation({
    mutationKey: ['payment'],
    mutationFn: usersService.pay,
    onSuccess: (data) => {
      window.location.href = data.data.checkout_url;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const signupMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: usersService.signup,
    onSuccess: (data) => {
      toast.success('Account created successfully, Pay your subscription now.');
      const body = {
        userId: data._id,
        name: data.fullname,
        email: data.email,
        phone: data.phone,
        amount: PlanPrice,
        return_url: `http://localhost:3500/payment-success`,
      };
      if (data.plan !== 'Free Trail') {
        paymentMutation.mutate(body);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const formAction = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      plan: PlanName,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => signupMutation.mutate(values),
  });

  return (
    <MainWrapper>
      <Helmet>
        <title>{`SignUp - HDMovie`}</title>
      </Helmet>
      <Marginer direction="vertical" margin="5rem" />
      <Button
        title="Back to choose a plan"
        icon={AiOutlineArrowLeft}
        left
        onClick={() => navigate('/pricing-plan')}
      />
      <Marginer direction="vertical" margin="2rem" />
      <h1 className="text-4xl font-semibold">Plan: {PlanName}</h1>
      <p className="text-2xl font-medium">{currencyFormatter(PlanPrice)}</p>
      <Marginer direction="vertical" margin="5rem" />
      <FormWrapper noValidate onSubmit={formAction.handleSubmit}>
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
          <ErrorText>{formAction.errors.fullname}</ErrorText>
        )}
        <label htmlFor="username">* User Name</label>
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
          <ErrorText>{formAction.errors.email}</ErrorText>
        )}
        <label htmlFor="phone">* Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formAction.values.phone}
          onChange={formAction.handleChange}
          onBlur={formAction.handleBlur}
        />
        {formAction.errors.phone && formAction.touched.phone && (
          <ErrorText>{formAction.errors.phone}</ErrorText>
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
        <Marginer margin="3rem" />
        <Button
          title="SignUp"
          Icon={MdLogin}
          left
          solid
          style={{ boxShadow: 'none' }}
          disabled={signupMutation.isLoading}
        />
      </FormWrapper>
    </MainWrapper>
  );
};

export default SignUp;
