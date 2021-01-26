import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import 'src/resources/style.css';
import { connect } from "react-redux";
import LoginView from "./views/auth/LoginView";

const App = (props) => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {props.account.loggedIn ? routing : <LoginView />}
    </ThemeProvider>
  );
};

export default connect(
  ({ account }) => ({ account }),
  null
)(App);
