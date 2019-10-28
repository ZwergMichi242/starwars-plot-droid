import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Plot from './Plot/Plot';
class Droid extends Component {

render() {
    return (
      <Jumbotron>
        <Plot />
      </Jumbotron>
    );
  }
}

export default Droid;
