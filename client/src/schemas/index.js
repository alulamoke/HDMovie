import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const loginSchema = yup.object().shape({
  username: yup.string().min(3).required('Required'),
  password: yup.string().min(6).required('Required'),
});

export const signupSchema = yup.object().shape({
  fullname: yup.string().min(5).required('Required'),
  username: yup.string().min(3).required('Required'),
  email: yup.string().email().required('Required'),
  phone: yup.number().min(10).max(10).required('Required'),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: 'Please create strong password' })
    .required('Required'),
});

export const reviewSchema = yup.object().shape({
  review: yup.string().required('Required'),
});
