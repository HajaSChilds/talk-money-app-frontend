import React, { Component } from 'react';
 
export default function Hints(props) {
     return(
         <div className="hints-section">
           <h2>HINTS</h2> 
           <h3>{props.hints}</h3>
       </div>
    );
}