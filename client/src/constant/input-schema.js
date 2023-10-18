export const signupSchema = {
  fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3,
      maximum: 64,
    },
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3,
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 10,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 64,
    },
  },
};

export const loginSchema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3,
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 64,
    },
  },
};

export const reviewSchema = {
  review: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3,
    },
  },
};
