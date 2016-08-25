import Notifications from 'react-notify-toast';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';

ReactDOM.render(
  <div>
    <Notifications />
    <Routes />
  </div>,
  document.getElementById('app')
);
