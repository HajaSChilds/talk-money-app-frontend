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
    this.manageHints = this.manageHints.bind(this);
    this.showHint = this.showHint.bind(this);
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

      }).catch(error => {
          if (error.response) {
              console.log("Error getting Intro Messages", error);
              alert("There was a problem retrieving info for the game: ", error.response)
          } else if (error.request) {
              console.log("Error sending out message", error.request);
              alert("Sorry there was a problem making a connection to the server", error.request);
            // client never received a response, or request never left
          } else {
            // anything else
              console.log("Something else went wrong");
              alert("Something went wrong, please try again later");
          }
      })
        
    }

    

    handlePlayerInput() {

    }


    getQuestions() {

    }

    showHint(){
      console.log("Hint showed")
    }


    manageHints() {
       let currentHints = this.state.hints;
       if (currentHints > 0) {
          this.showHint();
          currentHints -=1;
          this.setState({ hints : currentHints})
       } else {
         alert("Sorry, you don't have any more hints left")
       }
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
          <button className="hint-btn" onClick={() => this.manageHints}>Receive Hint</button>
          <Hints props={String(this.state.hints)}/>
          <Score />
        </section>
      </div>
    );
  }
}
