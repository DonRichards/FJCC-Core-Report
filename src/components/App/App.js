import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';


@withContext
@withStyles(styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render () {
    return !this.props.error ? (
      <div>
        <Header />
        <div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"> </script>
          <p></p>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
          <p></p>
          <script src="/javascripts/home-page.js"></script>
        </div>
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;
