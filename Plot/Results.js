import React, { Component } from 'react';
import { Media, Card, Button, Modal } from 'react-bootstrap';

class Results extends Component {
  constructor(props) {
    super(props);
      this.state = {
    planet1: this.props.choices.planet1,
	  planet2: this.props.choices.planet2,
    hero: this.props.choices.hero,
	  friend: this.props.choices.friend,
		unexpHero: this.props.choices.unexpHero,
		enemy: this.props.choices.enemy,
		ending: this.props.choices.ending,
		planet1Climate: '',
		planet1Terrain: '',
		planet2Climate: '',
		planet2Terrain: '',
		heroPronoun: '',
		heroPossessiveAdj: '',
		enemyObjPronoun: '',
		enemyPronoun: '',
		heroMass: '',
		enemyMass: '',
		story: ''
      }
    this.getPlanetInfo = this.getPlanetInfo.bind(this);
    this.getPersonInfo = this.getPersonInfo.bind(this);
    this.writeStory = this.writeStory.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

getPlanetInfo(planet, number) {
  fetch('https://swapi.co/api/planets/?search=' + planet)
    .then(response => response.json())
	.then(responseJSON => {
	  if (number === 1) {
	    this.setState({planet1Climate: responseJSON.results[0].climate})
		this.setState({planet1Terrain: responseJSON.results[0].terrain})
	   }
	   else if (number === 2){
		this.setState({planet2Climate: responseJSON.results[0].climate})
		this.setState({planet2Terrain: responseJSON.results[0].terrain});
	   }
	})
   }

getPersonInfo(person, role) {
  fetch('https://swapi.co/api/people/?search=' + person)
    .then(response => response.json())
	.then(responseJSON => {
      if (role === 'hero') {
		this.setState({heroMass: responseJSON.results[0].mass})
		if (responseJSON.results[0].gender === 'male') {
		  this.setState({heroPronoun: 'he'})
		}
		else if (responseJSON.results[0].gender === 'female') {
		  this.setState({heroPronoun: 'she'})
		}
		else {
	      this.setState({heroPronoun: 'they'})
		}

		if (responseJSON.results[0].gender === 'male') {
		  this.setState({heroPossessiveAdj: 'his'})
		}

		else if (responseJSON.results[0].gender === 'female') {
		  this.setState({heroPossessiveAdj: 'her'})
		}
		else {
		  this.setState({heroPossessiveAdj: 'their'})
		}
	  }

	  else if (role === 'enemy') {
		this.setState({enemyMass: responseJSON.results[0].mass})
		if (responseJSON.results[0].gender === 'male') {
		  this.setState({enemyObjPronoun: 'him'})
		}
	    else if (responseJSON.results[0].gender === 'female') {
	      this.setState({enemyObjPronoun: 'her'})
		}
		else {
		  this.setState({enemyObjPronoun: 'them'})
		}
		if (responseJSON.results[0].gender === 'male') {
		  this.setState({enemyPronoun: 'he'})
		}
		else if (responseJSON.results[0].gender === 'female') {
		  this.setState({enemyPronoun: 'she'})
		}
		else {
		  this.setState({enemyPronoun: 'they'})
		}
	   }
	})
}


writeStory() {
  this.getPersonInfo(this.props.choices.hero, 'hero');
  this.getPersonInfo(this.props.choices.enemy, 'enemy');
  this.getPlanetInfo(this.props.choices.planet1, 1);
  this.getPlanetInfo(this.props.choices.planet2, 2);
  var that = this;

  let promise = new Promise(function (resolve, reject) {
	window.setTimeout(function(){
	  let ending = '';
	  if (that.state.ending === 'happy'){
		ending = `They all went back to ${that.state.planet1} together and enjoyed the rest of their evening. `
	  }
      else if (that.state.ending === 'tragic'){
		ending = `Unfortunately, on the way back to ${that.state.planet1}, their starship crashed. `
	  }
	  else if (that.state.ending === 'cliffhanger'){
		ending = `They were on the way back to ${that.state.planet1} when all of the sudden they saw ${that.state.     enemy} chasing them again! and this time ${that.state.enemyPronoun} brought a bunch of friend with ${that.state.enemyObjPronoun}! What will they do? `
	   }

	   let fightParagraph = that.state.heroMass > that.state.enemyMass ? `Because ${that.state.heroPronoun} was bigger than ${that.state.enemy}, the fight was easy and ${that.state.heroPronoun} rescued ${that.state.friend} just in time to go back home before ${that.state.heroPossessiveAdj} favorite show was over.` : `${that.state.enemy} was bigger than ${that.state.hero}, so it was a difficult fight. ${that.state.hero} looked like he was going to lose! So ${that.state.friend} got loose, grabed a rock and hit ${that.state.enemy} in the head! They made a run for it and got away from ${that.state.enemy} as fast as they could. `

		let story =  `A long time ago in a galaxy far, far away... ` +
					`It was a regular day in the planet ${that.state.planet1}. The climate was ${that.state.planet1Climate} as usual and ${that.state.hero} was going about ${that.state.heroPossessiveAdj} usual business on the ${that.state.planet1Terrain} terrain, when suddenly, ${that.state.unexpHero} came running with the horrifying news that ${that.state.friend} had been kidnapped by ${that.state.enemy}! ` +
					`Immediately, ${that.state.hero} set off to ${that.state.planet2} to fight ${that.state.enemy} and rescue ${that.state.friend}. He was surprised by the ${that.state.planet2Terrain} terrain and the ${that.state.planet2Climate} climate. ` +  fightParagraph  + ending;

		resolve(story);
	});
   })

   return promise;
}

handleClick() {
  this.writeStory().then(story => this.setState({story: story}))
}

render() {
  let title = this.props.choices.title;
  let description = this.props.choices.description;
  let planet1 = this.props.choices.planet1;
  let planet2 = this.props.choices.planet2;
  let hero = this.props.choices.hero;
  let friend = this.props.choices.friend;
  let unexpHero = this.props.choices.unexpHero;
  let enemy = this.props.choices.enemy;
  let ending = this.props.choices.ending;

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="head">
        <h5>{description}</h5>
        <h4>You choose the following resources:</h4>
      </Modal.Body>
      <Modal.Body>
        <h6>{hero}</h6>
        <h6>{friend}</h6>
        <h6>{enemy}</h6>
        <h6>{unexpHero}</h6>
        <h6>{planet1}</h6>
        <h6>{planet2}</h6>
        <h6>{ending}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"onClick={this.handleClick} data-toggle="modal" data-target="#story">Generate Plot</Button>
        <div id="story" className="modal "><div id="move">{this.state.story}</div></div>
      </Modal.Footer>
    </Modal.Dialog>
  	)
  }
}
export default Results;
