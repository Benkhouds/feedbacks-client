import * as Yup from 'yup';

const loginSchema = Yup.object({
   email: Yup.string().email('Email is invalid').required("Can't be empty"),
   password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required("Can't be empty"),
});

export default loginSchema;
