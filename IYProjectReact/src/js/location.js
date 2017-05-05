import React, { Component } from 'react';
import '../css/App.css';

// Attempting to get Geolocation data through the built in browser function

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        null;
    }
}
function showPosition(position) {
    return ( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude ); 
}



class Location extends React.Component {

 render() {
   return (
     <div className = "App">
     Location Component
       
        
     </div>
   );
 }

} 

module.exports = Location;
