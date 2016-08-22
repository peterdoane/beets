import React from 'react';
import { Link } from 'react-router';

const Signup = React.createClass({
  render() {
    return <div>
      <h2>Sign Up Now</h2>
      <div>
        <input type="text" placeholder="Choose username" />
      </div>
      <div>
        <input type="password" placeholder="Choose password" />
      </div>
      <div>
        <button value="signup-btn">Register</button>
      </div>
      <Link to={'/'}>Nevermind</Link>
    </div>;
  }
});

export default Signup;
