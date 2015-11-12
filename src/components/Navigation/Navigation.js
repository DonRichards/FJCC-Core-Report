import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/report" onClick={Link.handleClick}>Build Report</a>
        <a className="Navigation-link" href="/faq" onClick={Link.handleClick}>FAQ</a>
        <a className="Navigation-link" href="/contact" onClick={Link.handleClick}>Contact</a>
        <span className="Navigation-spacer"> | </span>
        <a href="/auth/google" className="Navigation-link" >Google </a>
      </div>
    );
  }

}

export default Navigation;

// <span className="Navigation-spacer">or</span>
// <a className="Navigation-link Navigation-link--highlight" href="/register" onClick={Link.handleClick}>Sign up</a>
// <a className="Navigation-link" href="/login" onClick={Link.handleClick}>Log in</a>
