import Routes from 'components/Routes';
import React from 'react';
import ReactDOM from 'react-dom';
import Notifications from 'react-notify-toast';

ReactDOM.render(
  <div>
    <Notifications />
    <Routes />
  </div>,
  document.getElementById('app')
);
