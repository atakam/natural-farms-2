import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  // const navigate = useNavigate();

  const hash = (string) => {
    return sha256(string).toString();
  };

  const newCustomer = async (entries) => {
    const response = await fetch('/customer/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    });
    const body = await response.text();
    console.log({ body });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
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
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              streetAddress: '',
              city: '',
              postalCode: '',
              province: '',
              phoneNumber: '',
              weekAmount: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('Password is required'),
                streetAddress: Yup.string().max(255).required('Street address is required'),
                city: Yup.string().max(255).required('City is required'),
                postalCode: Yup.string().max(255).required('Postal Code is required'),
                province: Yup.string().max(255).required('Proovince is required'),
                phoneNumber: Yup.string().max(255).required('Phone number is required'),
                weekAmount: Yup.string().max(255).required('Amount per week is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(values) => {
              const entries = {
                ...values,
                password: hash(values.password)
              };
              console.log(entries);
              newCustomer(entries);
              // navigate('/app/dashboard', { replace: true });
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
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                  className="halfWidth"
                />
                <span style={{ padding: '10px' }} />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                  className="halfWidth"
                />

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  className="halfWidth"
                />
                <span style={{ padding: '10px' }} />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  className="halfWidth"
                />

                <TextField
                  error={Boolean(touched.streetAddress && errors.streetAddress)}
                  helperText={touched.streetAddress && errors.streetAddress}
                  label="Street Address"
                  margin="normal"
                  name="streetAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.streetAddress}
                  variant="outlined"
                  className="halfWidth"
                />
                <span style={{ padding: '10px' }} />
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                  label="City"
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                  className="halfWidth"
                />

                <TextField
                  error={Boolean(touched.postalCode && errors.postalCode)}
                  helperText={touched.postalCode && errors.postalCode}
                  label="Postal Code"
                  margin="normal"
                  name="postalCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.postalCode}
                  variant="outlined"
                  className="halfWidth"
                />
                <span style={{ padding: '10px' }} />
                <TextField
                  error={Boolean(touched.province && errors.province)}
                  helperText={touched.province && errors.province}
                  label="Province"
                  margin="normal"
                  name="province"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.province}
                  variant="outlined"
                  className="halfWidth"
                />

                <TextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Phone Number"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                  className="halfWidth"
                />
                <span style={{ padding: '10px' }} />
                <TextField
                  error={Boolean(touched.weekAmount && errors.weekAmount)}
                  helperText={touched.weekAmount && errors.weekAmount}
                  label="Amount spent on meat per week"
                  margin="normal"
                  name="weekAmount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weekAmount}
                  variant="outlined"
                  className="halfWidth"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
