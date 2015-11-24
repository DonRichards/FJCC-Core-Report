import React, { Component } from 'react';
import styles from './Report.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Report extends Component {

  render() {
    return (
      <div className="ReportPage">
      <h1>Script Fired! </h1>
        </div>
    );
  }

}

export default Report;
