import * as Yup from 'yup';

const loginSchema = Yup.object({
   firstName: Yup.string()
      .max(12, 'First name should be less or equal to 12 characters')
      .required("Can't be empty"),
   lastName: Yup.string()
      .max(15, 'Last name should be less or equal to 15 characters')
      .required("Can't be empty"),
   username: Yup.string()
      .max(8, 'Username should be less or equal to 8 characters')
      .required("Can't be empty"),
   email: Yup.string().email('Email is invalid').required("Can't be empty"),
   password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required("Can't be empty"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required("Can't be empty"),
});

export default loginSchema;
