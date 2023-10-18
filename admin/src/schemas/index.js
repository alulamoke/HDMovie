import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(6).required('Required'),
});

export const signupSchema = yup.object().shape({
  fullname: yup.string().min(5).required('Required'),
  email: yup.string().email().required('Required'),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: 'Please create strong password' })
    .required('Required'),
});

export const castSchema = yup.object().shape({
  fullname: yup.string().min(5).required('Required'),
  birthday: yup.date().required('Required'),
  deathday: yup.date(),
  biography: yup.string().required('Required'),
});

export const genreSchema = yup.object().shape({
  name: yup.string().min(5).required('Required'),
});
