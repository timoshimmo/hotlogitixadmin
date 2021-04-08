import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { history } from './helpers';
import './App.css';
import Routes from './Routes';


export default class App extends Component {
  render() {
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
  }
}
