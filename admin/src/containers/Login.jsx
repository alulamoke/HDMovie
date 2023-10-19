import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { CiLogin } from 'react-icons/ci';

import { useFormik } from 'formik';
import { loginSchema } from '../schemas';

// React query
import { useMutation } from '@tanstack/react-query';
import adminService from '../services/admin.service';

//Redux
import { useDispatch } from 'react-redux';
import { setCredentails } from '../app/authSlice';

// Components
import Header from '../components/Header';
import Button from '../components/Button';

import * as ROUTES from '../constant/routes';
import localStore from '../utils/localStore';

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
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => loginMutation.mutate(values),
  });

  return (
    <>
      <Helmet>
        <title>{`Login - HDMovie`}</title>
      </Helmet>
      <form
        noValidate
        onSubmit={formAction.handleSubmit}
        className="max-w-screen-md mx-auto flex flex-col mt-24 gap-4"
      >
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
          title="Log In"
          Icon={CiLogin}
          left
          solid
          disabled={loginMutation.isLoading}
          className="my-8"
        />
        <p className="text-2xl text-secondary font-medium text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
