import React, { Component } from 'react';
 
export default function Score(props) {
     return(
         <div className="score-section">
           <h2>SCORE</h2> 
           <h3>{props.score}</h3>
       </div>
    );
}