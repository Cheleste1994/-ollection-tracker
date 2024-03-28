import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Name required'),
    category: yup.string().required('Category required'),
    description: yup.string(),
  })
  .required();

export type SchemaItem = yup.InferType<typeof schema>;

export default schema;
