// STRINGS (MESSAGES)
const TOO_SHORT = 'Item is Too Short!';
const TOO_LONG = 'Item is Too Long!';
const REQUIRED = 'This Field is Required!';
const EMAIL = 'Invalid Email';
const GENERIC_FIELD_ERROR = "Something's not right";

const API_BASE = '/backend/';
const TODO_BASE = `${API_BASE}todo/`;
const URLS = {
  api: {
    todos: `${TODO_BASE}todos/`,
    categories: `${TODO_BASE}categories/`,
  },
};

export { TOO_SHORT, TOO_LONG, REQUIRED, EMAIL, GENERIC_FIELD_ERROR, URLS };
