import React, { useState } from 'react';
import { connect } from "react-redux";
import { signin } from "../../actions/account";
import fetchStates from "../../reducers/fetchStates";
import { useNavigate } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import PersonIcon from '@material-ui/icons/Person';
import RegisterView from './RegisterView';
import Password from './Password';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const hash = (string) => {
  return sha256(string).toString();
};

const LoginView = (props) => {
  const {
    message
  } = props.account;

  const classes = useStyles();

  const signUp = () => {
    //navigate('/register');
    setLogin(false);
  };

  const [isLogin, setLogin] = useState(true);

  return isLogin ? (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              console.log(values);
              props.signin({...values, password: hash(values.password)})
              .then(response => {
                console.log(response);
              });
              //navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={3}
                  />
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<PersonIcon />}
                      onClick={signUp}
                      size="large"
                      variant="contained"
                    >
                      New Customer
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="h3"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <Password
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  fullWidth
                />
                <Typography
                    color="error"
                    variant="body1"
                  >
                    { message }
                </Typography>
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  ) : <RegisterView setLogin={setLogin} />;
};

export default connect(
  ({ account }) => ({ account }), 
  { signin }
)(LoginView);
