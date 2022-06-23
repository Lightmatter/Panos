import * as Yup from 'yup';
import { REQUIRED } from 'constants.js';

const TodoSchema = Yup.object().shape({
  title: Yup.string().nullable().required(REQUIRED),
  description: Yup.string().nullable(),
});

const TodoSearchSchema = Yup.object().shape({
  category: Yup.string().nullable(),
  search: Yup.string().nullable(),
});

export { TodoSchema, TodoSearchSchema };
