import * as Yup from 'yup';
import { REQUIRED } from 'constants.js';

const TodoSchema = Yup.object().shape({
  title: Yup.string().nullable().required(REQUIRED),
  description: Yup.string().nullable(),
});

// eslint-disable-next-line import/prefer-default-export
export { TodoSchema };
