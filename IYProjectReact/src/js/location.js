import React, { Component } from 'react';
import '../css/App.css';

// Attempting to get Geolocation data through the built in browser function

class Location extends React.Component {

    getLocation() {
        
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            null;
        }

    }

    showPosition(position) {

        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        return [String(position.coords.latitude), String(position.coords.longitude)]; 
    }

    render() {
       return (
         <div className = "App">

             {this.getLocation()}
            
         </div>
       );
     }

}

var coordinates = getLocation(); 

module.exports = Location;
