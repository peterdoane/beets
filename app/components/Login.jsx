import React from 'react';
import { Link } from 'react-router';
import Signup from 'components/Signup';

const Login = React.createClass({
  render() {
    return <div>
      <h2>Log In!!!</h2>
      <div>
        <input type="text" placeholder="Username" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
      </div>
      <Link to="Signup">Need an account? Sign up here!</Link>
    </div>;
  }
});

export default Login;
