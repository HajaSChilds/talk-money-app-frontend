import React, { Component } from 'react';
import Axios from 'axios';

import Hints from './Hints.js'
import Score from './Score.js'
 

export default class MainStage extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      isloading: true,
      gameState: 'ON-GAME', //handle game status - : intro, on-game, conclusion
      score: 0, //handle game score:
      hints: 3,
      user_success: 'PENDING',
    };
  }

  render() {

    const gameState = this.state.gameState;
    return (
      <div className="main-stage">
        <section className="showtime">
          <div className="title">
            {gameState === 'INTRO' ? (
              <h1>Welcome to Talk Money Mini-Game</h1>
            ) : (
              <h1>Let's Talk Money!!</h1>
            )}
          </div>
          <div className="info-card"></div>
          <form action="">
            <input type="text" />
            <button className="submit-btn">Submit</button>
          </form>
        </section>
        <section className="seats">
          <button className="hint-btn">Get A Hint</button>
          <Hints />
          <Score />
        </section>
      </div>
    );
  }
}
