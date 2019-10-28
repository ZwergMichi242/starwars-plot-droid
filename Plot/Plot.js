import React, { Component } from 'react';
import { Container, Card, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import Results from './Results'

class Droid extends Component {
  constructor(props) {
    super(props);
      this.state = {
        peopleList: [],
        planetsList: [],
        description: '',
        endings: ['happy', 'tragic', 'cliffhanger'],
        choices: {
            title: '',
            description: '',
            hero: 'Luke Skywalker',
            planet1: 'Alderaan',
            planet2: 'Alderaan',
            enemy: 'Luke Skywalker',
            friend: 'Luke Skywalker',
            unexpHero: 'Luke Skywalker',
            ending: 'happy'
        },
        clicked: false
      }
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleClick = this.handleClick.bind(this);

  }

getResources(url, resultsArr, stateProp){
  fetch(url)
  .then(response => response.json())
  .then(responseJSON => {
    responseJSON.results.forEach(item => {
      resultsArr.push(item.name)
    })
    if (responseJSON.next === null) {
      if (stateProp === 'peopleList') {
        this.setState({peopleList: resultsArr})
      }
      else if (stateProp === 'planetsList') {
        this.setState({planetsList: resultsArr})
      }

    } else {
      this.getResources(responseJSON.next, resultsArr, stateProp)
    }
  })
}
componentDidMount() {
  let peopleArr = [];
  let planetsArr = [];
  this.getResources('https://swapi.co/api/people/', peopleArr, 'peopleList')
  this.getResources('https://swapi.co/api/planets/', planetsArr, 'planetsList')
 }


handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  const choicesCopy = JSON.parse(JSON.stringify(this.state.choices))
  choicesCopy[name] = value;
  this.setState({
    choices: choicesCopy
  });
}

handleClick() {
  this.setState({clicked: !this.state.clicked})

}

render() {
    return (
      <Container>
      <Card bg="transparent">
        <Card.Header>Star Wars Plot-Droid</Card.Header>
        <Card.Title>Create your individual Star Wars Plot featuring your favourite Characters, Planets and Species!
        </Card.Title>
        <Card.Body>
          <Form>
          <Form.Group>
             <Form.Label>Title:</Form.Label>
             <Form.Control type="text" name="title" value={this.state.choices.title} onChange={this.handleInputChange} />
           </Form.Group>
           <Form.Group>
             <Form.Label>Description:</Form.Label>
             <Form.Control as="textarea" name="description" value={this.state.choices.description} onChange={this.handleInputChange} rows="2" />
           </Form.Group>

          <Form.Label>Choose a hero:</Form.Label>
          <Form.Control as="select" name="hero" value={this.state.choices.hero} onChange={this.handleInputChange}>
            {this.state.peopleList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>Choose a friend that needs help:</Form.Label>
          <Form.Control as="select" name="friend" value={this.state.choices.friend} onChange={this.handleInputChange}>
            {this.state.peopleList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>Choose the enemy:</Form.Label>
          <Form.Control as="select"name="enemy" value={this.state.choices.enemy} onChange={this.handleInputChange}>
            {this.state.peopleList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>Choose an unexpected helper:</Form.Label>
          <Form.Control as="select" name="unexpHero" value={this.state.choices.unexpHero} onChange={this.handleInputChange}>
            {this.state.peopleList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>Choose the 1st Planet:</Form.Label>
          <Form.Control as="select" name="planet1" value={this.state.choices.planet1}  onChange={this.handleInputChange}>
            {this.state.planetsList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>Choose the 2nd Planet:</Form.Label>
          <Form.Control as="select" name="planet2" value={this.state.choices.planet2} onChange={this.handleInputChange}>
            {this.state.planetsList.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>

          <Form.Label>What end should your plot have:</Form.Label>
          <Form.Control as="select" name="ending" value={this.state.choices.ending} onChange={this.handleInputChange}>
            {this.state.endings.map((item, index) => <option value={item} key={index+1}>{item}</option>)}
          </Form.Control>
          </Form>
        </Card.Body>
      </Card>
      <Button className="btn" data-toggle="modal" data-target="#1modal" onClick={this.handleClick}>{!this.state.clicked ? "Review Droid Instructions" : "New Droid" }</Button>
      {this.state.clicked ? <Results choices={this.state.choices}/> : null}
            </Container>
    );
  }
}
export default Droid;
