import React from 'react';
import { ConnectedRouter } from 'connected-react-router'

// import routes from './Routes';
import BasicLayout from './layouts/basic';
// import logo from './logo.svg';
import './App.css';


const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <BasicLayout />
    </ConnectedRouter>
  )
}

export default App;
