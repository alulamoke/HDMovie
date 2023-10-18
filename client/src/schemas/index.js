import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const loginSchema = yup.object().shape({
  username: yup.string().min(3).required('Required'),
  password: yup.string().min(6).required('Required'),
});

export const signupSchema = yup.object().shape({
  fullname: yup.string().min(5).required('Required'),
  username: yup.string().min(3).required('Required'),
  email: yup.string().email().required('Required'),
  phone: yup
    .string()
    .min(10)
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: 'Please create strong password' })
    .required('Required'),
});

export const reviewSchema = yup.object().shape({
  review: yup.string().required('Required'),
});
