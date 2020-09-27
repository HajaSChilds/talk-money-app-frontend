import React, { Component } from 'react';
import axios from 'axios';

import Hints from './Hints.js';
import Score from './Score.js';
import Timer from './Timer.js';
 

export default class MainStage extends Component {
  constructor() {
    super();
    

    this.state = {
      isloading: true,
      gameState: 'INTRO',     // handle game status - : intro, on-game, final
      allMessages: [],
      allQuestions: [],
      whichMessage: '',         // tracks which message the user is on
      whichQuestion: {} || '',        // tracks which question the user is on
      whichStyle: 'CAPS',       // tracks whether to send in all caps or not, caps, normal
      whichClosingComments: '', // tracks which message to deliver depending on whether wins or loses
      score: 0,                 //  handles game score:
      hints: 3,                 //  tracks number of hints currently available
      user_success: 'PENDING',  // tracks final outcome 'WINS' or 'LOSES'
    };

    this.getIntroMessages = this.getIntroMessages.bind(this); 
    this.getQuestions = this.getQuestions.bind(this);
    this.handlePlayerInput = this.handlePlayerInput.bind(this);
    this.manageHints = this.manageHints.bind(this);
    this.getHints = this.getHints.bind(this);
    this.showHint = this.showHint.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
    this.whichTitle = this.whichTitle.bind(this);
  
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
          this.setState({whichMessage : response.data[0]});

          // setTimeout(this.setState({gameState: 'ON-GAME'}), 30000);
         
          }).catch(error => { 
      if (error.response) {
          console.log("Error getting Intro Messages", error);
          alert("There was a problem retrieving info for the game: ", error.response);
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
      axios.get("http://localhost:5000/questions")

      .then(response => {
        console.log('questions: ', response);

        const questionsList = response.data;

        this.setState({allQuestions : questionsList});
        this.setState({whichQuestion: response.data[0]})



      })
      .catch(error => {
        if(error.response) {
          console.log("Error getting questions", error);
          alert("There was a problem retrieving the questions for the game: ", error.response);
      } else if (error.request) {
          console.log("Error sending out message", error.request);
          alert("Sorry there was a problem making a connection to the server", error.request);
        // client never received a response, or request never left
      } else {
        // anything else
          console.log("Something else went wrong");
          alert("Something went wrong, please try again later");
        }  
      });
    } 


    showHint(){
      console.log("Hint showed")
      let thisHint = this.state.whichQuestion.hint
      alert(`Here is your hint: ${thisHint} `)
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

    getUserStatus() {
      let finalScore = this.state.user_success;
      return finalScore;
    }

    componentDidMount() {
      if (this.state.gameState === 'INTRO') {
          this.getIntroMessages();
      }else if (this.state.gameState === 'ON-GAME'){
         this.getQuestions();
      }else {
        this.getUserStatus();
      }
    }


   whichTitle() {
      if (this.state.gameState === 'INTRO') {
        return "WELCOME!!!"
      } else if (this.state.gameState === 'ON-GAME') {
        return "LET'S TALK MONEY!!!";
      }else {
        if (this.state.user_success === 'WINS') {
           return "CONGRATULATIONS!!! YOU WON!!!"
        } else {
          return "SORRY, YOU DID NOT WIN THE CHALLENGE"
        }
      }
   }

   whichMainText() {
      if (this.gameState === 'INTRO') {
        return this.state.whichMessage;
      } else if (this.gameState === 'ON-GAME') {
        return this.state.whichQuestion; 
      }else {
        if (this.state.user_success === 'WINS') {
           return 
        } else {
          return "SORRY, YOU DID NOT WIN THE CHALLENGE"
      }
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
             <Timer />
            <div className="title">
                  <h1>{this.whichTitle()}</h1>
            </div>
            {gameState === 'INTRO' ? (
                <div className="info-card">{this.state.whichMessage}</div>
              ) : (
                <div className="info-card">{this.state.whichQuestion.question}</div>
              )}
            <form action="">
              <input type="text" />
              <button className="submit-btn">Submit Answer</button>
            </form>
        </section>
        <section className="seats">
          <button className="hint-btn" onClick={() => this.manageHints()}>Receive Hint</button>
          <Hints hints={num_hints}></Hints>
          <Score score={my_score}></Score>
        </section>
      </div>
    );
  }
}
