import React, { Component } from 'react';
import styles from './Feedback.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Feedback extends Component {

  render() {
    return (
      <div className="Feedback">
        <div className="Feedback-container">
          <a className="Feedback-link" href="#">Ask a question</a>
          <span className="Feedback-spacer">|</span>
          <a className="Feedback-link" href="https://github.com/.../issues/new">Report an issue</a>
        </div>
      </div>
    );
  }

}

export default Feedback;
