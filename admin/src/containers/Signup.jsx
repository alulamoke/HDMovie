import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { CiLogin } from 'react-icons/ci';

import { useFormik } from 'formik';
import { signupSchema } from '../schemas';

// React query
import { useMutation } from '@tanstack/react-query';
import adminService from '../services/admin.service';

// Components
import Header from '../components/Header';
import Button from '../components/Button';

import * as ROUTES from '../constant/routes';

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

  return (
    <>
      <Helmet>
        <title>{`Signup - HDMovie`}</title>
      </Helmet>
      <form
        noValidate
        onSubmit={formAction.handleSubmit}
        className="max-w-screen-md mx-auto flex flex-col mt-24 gap-4 p-8"
      >
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
        <Button
          title="SignUp"
          Icon={CiLogin}
          left
          solid
          disabled={signupMutation.isLoading}
          className="my-8"
        />
        <p className="text-2xl text-secondary font-medium text-center">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline">
            SignIn
          </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
