import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./loading.gif')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">FJCC Core Reporting</span>
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle"></h1>
            <p className="Header-bannerDesc">Merging Clients info & Google Analytics</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
