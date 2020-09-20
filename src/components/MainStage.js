import React, { Component } from 'react';
import axios from 'axios';

import Hints from './Hints.js'
import Score from './Score.js'
 

export default class MainStage extends Component {
  constructor() {
    super();
    

    this.state = {
      isloading: true,
      gameState: 'INTRO', // handle game status - : intro, on-game, conclusion
      allMessages: [],
      whichMessage: '', // tracks which message the user is on
      whichQuestion: '', //  tracks which question the user is on
      score: 0, //  handles game score:
      hints: 3,
      user_success: 'PENDING',
    };

    this.getIntroMessages = this.getIntroMessages.bind(this); 
    this.getQuestions = this.getQuestions.bind(this);
    this.handlePlayerInput = this.handlePlayerInput.bind(this);
    this.manageHints = this.manageHints.bind(this);
    this.getHints = this.getHints.bind(this);
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

          this.setState({allMessages : introList})
          

           
             
                
     
          // // introList.map(phrase => {
            
          //   setTimeout(this.setState({ whichMessage : phrase }), 6000)
              
          //   })

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
      console.log('Gets questions');
      
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

    getHints() {
      let myHints = this.state.hints
      return myHints;
    }

    componentDidMount() {
      if (this.state.gameState === 'INTRO') {
          this.getIntroMessages()
      }else if (this.state.gameState === 'ON-GAME'){
         this.getQuestions()
      }
    }

  render() {

    let gameState = this.state.gameState;
    let game_navigation = this.handlePlayerInput;
    let num_hints = String(this.state.hints);
    let my_score = String(this.state.score);

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
                <div className="info-card">{[...this.state.allMessages]}</div>
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
          <Hints hints={num_hints}></Hints>
          <Score score={my_score}></Score>
        </section>
      </div>
    );
  }
}
