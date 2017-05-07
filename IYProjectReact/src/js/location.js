import React, { Component } from 'react';
import '../css/App.css';

// Attempting to get Geolocation data through the built in browser function

class Location extends React.Component {

 showPosition(position) {

    console.log("Position: " + String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7));

    return String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7);
   
}

 getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

}

module.exports = Location;
