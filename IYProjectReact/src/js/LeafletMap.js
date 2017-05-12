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


  render() {
    //I JUST FUCKING HAD THIS WORKING!!! --> Node was deleted issue
    var centerLat;
    var centerLng;

     console.log("LENGTH OF COORDS " + Number(this.props.centerLocation.length)); 
     console.log("LATSTRING " + this.props.centerLocation.slice(0, 5));
     console.log("LONSTRING " + this.props.centerLocation.slice(7) );


    // if (Number(this.props.centerLocation.length) < 14) {
    //   centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
    //   centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);
    // }     
    //Don't need these
    if (Number(this.props.centerLocation.length) === 12) {
      centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
      centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);
    }
    else if (Number(this.props.centerLocation.length) === 13) {
      centerLat = Number(this.props.centerLocation.slice(0, 5)).toFixed(3);
      centerLng = Number(this.props.centerLocation.slice(6)).toFixed(3);      
    }

    else {   
      centerLat = Number(this.props.centerLocation.slice(0, 4)).toFixed(3);
      centerLng = Number(this.props.centerLocation.slice(7)).toFixed(3);
    }


    console.log("LAT " + centerLat);
    console.log("LON " + centerLng);
    

    var position = [centerLat, centerLng];
     /*
    const anotherPosition = [34.015, -81.029];
    var exampleDoctor = [34.078659, -80.950507];
    */

    return (
      <div >
        
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="#'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          <DoctorMarkersData doctorNames={this.props.doctorLocations.map(this.generateDoctorNames)} doctorMarkers={this.props.doctorLocations.map(this.generateDoctorLatLong)} />

          
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>

          
        </Map>
      </div>
    );

  }

}

module.exports = LeafletMap;
