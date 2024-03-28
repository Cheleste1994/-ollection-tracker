import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export type SchemaAuth = yup.InferType<typeof schema>;

export default schema;
