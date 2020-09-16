import React, { Component } from 'react';
import axios from 'axios';

import Hints from './Hints.js'
import Score from './Score.js'
 

export default class MainStage extends Component {
  constructor() {
    super();
    

    this.state = {
      isloading: true,
      gameState: 'INTRO',   // handle game status - : intro, on-game, conclusion
      whichMessage: '',     // tracks which message the user is on  
      whichQuestion: '',   //  tracks which question the user is on
      score: 0,           //  handles game score:
      hints: 3,
      user_success: 'PENDING',
    };

    this.getIntroMessages = this.getIntroMessages.bind(this); 
    this.getQuestions = this.getQuestions.bind(this);
    this.handlePlayerInput = this.handlePlayerInput.bind(this);
  }

    getIntroMessages() {
      axios.get("http://localhost:5000/intro")
      
      .then(response => {
          console.log("message",response);

          // Iterate through list
          // Show messages on at a time
          // Update state once complete
          const introList = response.data
          introList.map( phrase => {
           this.setState({ whichMessage : phrase })
               return phrase;
            })

      }).catch("Error Retrieving Intro Messages")
        
    }

    

    handlePlayerInput() {

    }


    getQuestions() {

    }


    componentDidMount() {
      if (this.state.gameState === 'INTRO') {
          this.getIntroMessages()
      }
    }

  render() {

    const gameState = this.state.gameState;
    const instructions = this.instructions;
    const game_navigation = this.handlePlayerInput;

    return (
      <div className="main-stage">
        <section className="showtime">
          <div className="title">
            {gameState === 'INTRO' ? (
              <h1> Welcome! </h1>
            ) : (
              <h1>Let's Talk Money!!</h1>
            )}
          </div>
          {gameState === 'INTRO' ? (
            <div className="info-card">{this.state.whichMessage}</div>
          ) : (
            <div className="info-card">{game_navigation}</div>
          )}
          <form action="">
            <input type="text" />
            <button className="submit-btn">Submit</button>
          </form>
        </section>
        <section className="seats">
          <button className="hint-btn">Receive Hint</button>
          <Hints />
          <Score />
        </section>
      </div>
    );
  }
}
