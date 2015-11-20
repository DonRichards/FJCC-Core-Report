import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Log In';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <h1>{title}</h1>
          <a href="/auth/google">Sign In with Google</a>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default LoginPage;
