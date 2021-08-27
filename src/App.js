import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { StyledEngineProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { history } from './helpers';
import theme from './theme';
import './App.css';
import Routes from './Routes';


export default class App extends Component {
  render() {
    return (
        <Router history={history}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </StyledEngineProvider>
        </Router>
    );
  }
}
