import AutoCompleteField from 'components/forms/fields/AutoCompleteField';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { URLS } from 'constants.js';
import axios from 'util/axios';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Container,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import useSWR from 'swr';

import SearchIcon from '@material-ui/icons/Search';
import { TodoSchema, TodoSearchSchema } from 'schemas';
import InputField from 'components/forms/fields/InputField';
import Loading from 'components/Loading';

const useStyles = makeStyles(theme => ({
  todo: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  field: {
    marginRight: theme.spacing(1),
    minWidth: '176px',
    '& .MuiInputBase-root': {
      marginBottom: 8,
    },
  },
  fieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& .MuiInputBase-root': {
      marginBottom: 0,
    },
  },
  search: {
    minWidth: 250,
  },
  otherWrapper: {
    display: 'flex',
    justifyItems: 'center',
  },
  submit: {
    marginLeft: 20,
  },
}));

function Todo() {
  const classes = useStyles();
  const $formik = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [todos, setTodos] = useState([]);

  const { data, isValidating, mutate } = useSWR(
    [URLS.api.todos],
    url =>
      axios({
        method: 'get',
        url,
      }).then(response => {
        return response.data;
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const handleFormSubmit = async (values, actions) => {
    try {
      await axios.post(URLS.api.todos, values);
      await mutate();
      await enqueueSnackbar('Successfully added Todo!', {
        variant: 'success',
      });
      actions.setSubmitting(false);
      return true;
    } catch (error) {
      actions.setSubmitting(false);
      if (error.nonFieldErrors) {
        enqueueSnackbar(error.nonFieldErrors, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('There was an error with your request', {
          variant: 'error',
        });
        actions.setErrors(error);
      }
      return false;
    }
  };

  const handleSearch = values => {
    var params = {};
    params['category'] = null;
    if (values.category) {
    params['category'] = values.category.slug;
    }
    params['search'] = null;
    if (values.search) {
    params['search'] = values.search;
    }
   axios({
        method: 'get',
         url: URLS.api.todos,
      params: params,
    }).then(response => {
       let results = response.data.results;
      console.log('poop ---', results);
      setTodos(results);
    });
  };

  useEffect(() => {
    setTodos(data?.results);
  }, [data]);

  return (
    <>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          alignItems="center"
          mb={4}
          mt={4}
        >
          <Typography variant="h1">Amazing TODO App</Typography>
        </Box>
        <Formik
          innerRef={$formik}
          validationSchema={TodoSearchSchema}
          enableReinitialize
          initialValues={{
            title: '',
            description: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                fullWidth
                name="title"
                required
                label="Title"
                helperText="Title for the TODO"
              />
              <InputField
                fullWidth
                name="description"
                required
                label="Description"
                helperText="Description for the TODO"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid && dirty}
              >
                Add TODO
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
      {!data && isValidating ? (
        <Loading styles={[classes.loading]} />
      ) : (
        <Container maxWidth="md">
          <Box display="flex" flexWrap="wrap" mt={6} justifyContent="center">
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              mb={4}
            >
              <Typography variant="h3">My Todos</Typography>
              <Formik
                innerRef={$formik}
                validationSchema={TodoSearchSchema}
                enableReinitialize
                initialValues={{
                  category: null,
                  search: '',
                  description: '',
                }}
                onSubmit={handleSearch}
              >
                {({ values, handleSubmit, isValid, dirty }) => (
                  <Form onSubmit={handleSubmit}>
                    <Box className={classes.fieldWrapper}>
                      <AutoCompleteField
                       fullWidth
                       name="category"
                       type="text"
                       label="Category"
                       value={values.category}
                       optionLabel={option => `${option.name}`}
                       variant="filled"
                       callbackURL={URLS.api.categories}
                       className={classes.field}
                       disabled={false}
                     />
                      <InputField
                        fullWidth
                        name="search"
                        type="text"
                        variant="outlined"
                        label="Search for Todoos"
                        className={clsx(classes.field, classes.search)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"> <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        className={classes.submit}
                        disabled={!isValid && dirty}
                      >
                        Search
                    </Button>
                  </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            {todos && todos.length > 0 ? (
              todos.map((todo, index) => (
                <Card key={index} raised className={classes.todo}>
                  <Typography>{todo.title}</Typography>
                  <Typography>{todo.description}</Typography>
                </Card>
              ))
            ) : (
              <Box width="100%">
                <Typography>Nothing To Do!</Typography>
              </Box>
            )}
          </Box>
        </Container>
      )}
    </>
  );
}

export default Todo;
