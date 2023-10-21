import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import './style.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState({
    data: null,
    status: false,
  });
  return authenticated.status ? (
    <Dashboard setAuth={setAuthenticated} />
  ) : (
    <Auth setAuth={setAuthenticated} />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
