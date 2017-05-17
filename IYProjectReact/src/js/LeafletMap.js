import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import DoctorMarkersData from './DoctorMarkersData';
import '../css/App.css';



class LeafletMap extends Component {


  constructor() {


    super();

    this.state = {
      zoom: 8,
      coordinates: undefined
    };

  }

  generateDoctorLatLong (array) {
  
    function fetchCoords (obj) {    
      return (
        obj.lat + ", " + obj.lon
      );
    }
    
    return array.map(fetchCoords);

  }

  generateDoctorNames (array) {
    function fetchNames (obj) {
      return obj.name;
    }
    return array.map(fetchNames);
  }

  generateDoctorUIDS (array) {
    function fetchUIDS (obj) {
      return obj.uid;
    }

    return array.map(fetchUIDS);
  } 


  render() {
    //I JUST FUCKING HAD THIS WORKING!!! --> Node was deleted issue
    var centerLat;
    var centerLng;

     console.log("LENGTH OF COORDS " + Number(this.props.centerLocation.length)); 
     console.log("LATSTRING " + this.props.centerLocation.slice(0, 5));
     console.log("LONSTRING " + this.props.centerLocation.slice(7) );

     // if (Number(this.props.centerLocation.length) === 14) {
     //    centerLat = Number(this.props.centerLocation.slice(0, 4)).toFixed(3);
     //    centerLng = Number(this.props.centerLocation.slice(7)).toFixed(3);
     // }
     // else if (Number(this.props.centerLocation.length) === 13) {
     //    centerLat = Number(this.props.centerLocation.slice(0, 3)).toFixed(3);
     //    centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);        
     // }
     // else if (Number(this.props.centerLocation.length) === 12) {
     //    centerLat = Number(this.props.centerLocation.slice(0, 2)).toFixed(3);
     //    centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);           
     // }



    // if (Number(this.props.centerLocation.length) < 14) {
    //   centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
    //   centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);
    // }     

    // if (Number(this.props.centerLocation.length) === 12) {
    //   centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
    //   centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);
    // }
    // else if (Number(this.props.centerLocation.length) === 13) {
    //   centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
    //   centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);      
    // }

    // else {   
      centerLat = Number(this.props.centerLocation.slice(0, 6));
      centerLng = Number(this.props.centerLocation.slice(7));
    //}


    console.log("LAT " + centerLat);
    console.log("LON " + centerLng);
    

    var position = [centerLat, centerLng];
     /*
    const anotherPosition = [34.015, -81.029];
    var exampleDoctor = [34.078659, -80.950507];
    */
// var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//   subdomains: 'abcd',
//   maxZoom: 19
// });
    return (
      <div >
        
        <Map center={position} zoom={this.state.zoom} animate={true}>
          <TileLayer
            attribution='&copy; <a href="#'
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
          />

          <DoctorMarkersData 
            doctorArray={this.props.doctorArray}
            doctorMarkers={this.props.doctorLocations.map(this.generateDoctorLatLong)}

            doctorUIDS={this.props.doctorLocations.map(this.generateDoctorUIDS)}
            profileUIDS={this.props.doctorArray.map(function(obj) {return obj.uid})}
            doctorNames={this.props.doctorArray.map(function(obj) {return obj.profile.first_name + " " + obj.profile.last_name + ", " + obj.profile.title })}
             />
            }
            }

          
          <Marker position={position}>
            <Popup>
              <span>Your location</span>
              
            </Popup>
          </Marker>

          
        </Map>
      </div>
    );

  }

}

module.exports = LeafletMap;
