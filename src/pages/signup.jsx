import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Form, Field, Formik } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

import { useRouter } from 'next/router';
import AccountPageHeader from 'components/AccountPageHeader';
import Link from 'components/router/Link';
import PasswordField from 'components/PasswordField';
import { registerUser, logIn, SignupSchema } from 'models/user';
import { useSnackbar } from 'notistack';
import { postLoginUrl, withoutAuth } from 'util/withAuth';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    marginBottom: theme.spacing(1),
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <AccountPageHeader>
        <img src="placeholder.png" width="100%" alt="placeholder" />
      </AccountPageHeader>
      <Typography variant="h5" component="h1">
        Register here, become a user!
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          rePassword: '',
          tos: false,
        }}
        className={classes.form}
        validateOnChange
        validateOnBlur={false}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            registerUser(values)
              .then(() => {
                const loginPromise = logIn(values);
                return loginPromise;
              })
              .then(response => {
                // TODO: This should probably make a different message if you're actually a returning user
                // with good creds, since you're not actually registering in that case.
                enqueueSnackbar('Successfully registered!', {
                  variant: 'success',
                });
                router.push(postLoginUrl(router.query));
                return response;
              })
              .then(response => {
                actions.setSubmitting(false);
                return response;
              })
              .catch(error => {
                actions.setSubmitting(false);
                if (error.nonFieldErrors) {
                  enqueueSnackbar(error.nonFieldErrors, {
                    variant: 'error',
                  });
                } else {
                  actions.setErrors(error);
                }
              });
          });
        }}
      >
        <Form>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                name="firstName"
                label="First Name"
                data-cy="first-name"
                autoComplete="given-name"
                placeholder="Enter First Name"
                margin="dense"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                component={TextField}
                data-cy="last-name"
                label="Last Name"
                autoComplete="family-name"
                placeholder="Enter Last Name"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="email"
                component={TextField}
                data-cy="email"
                type="email"
                label="Email"
                autoComplete="email"
                placeholder="Enter Email Address"
                helperText="We promise not to spam you"
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                fullWidth
                name="password"
                autoComplete="new-password"
                label="Password"
                dataCy="password"
                placeholder="Create Password"
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                fullWidth
                name="rePassword"
                autoComplete="new-password"
                label="Confirm Password"
                dataCy="re-password"
                placeholder="Repeat Password"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={CheckboxWithLabel}
                name="tos"
                data-cy="tos"
                type="checkbox"
                margin="dense"
                Label={{
                  label: (
                    <>
                      You accept our{' '}
                      <Link target="_blank" href="/terms">
                        TOS (opens in new tab)
                      </Link>
                    </>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            data-cy="submit-signup"
            className={classes.bottomSpace}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignUp;
export const getServerSideProps = withoutAuth();
