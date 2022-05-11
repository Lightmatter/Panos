import { useRef } from 'react';
import { URLS } from 'constants.js';
import axios from 'util/axios';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Button, Container, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import useSWR from 'swr';

import { TodoSchema } from 'schemas';
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
}));

function Todo() {
  const classes = useStyles();
  const $formik = useRef();
  const { enqueueSnackbar } = useSnackbar();

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

  const todos = data?.results || [];

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
          validationSchema={TodoSchema}
          enableReinitialize
          initialValues={{
            title: null,
            description: null,
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
            <Box width="100%" display="flex" justifyContent="center" mb={4}>
              <Typography variant="h3">My Todos</Typography>
            </Box>
            {todos.length > 0 ? (
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
