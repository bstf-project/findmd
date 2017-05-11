import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import DoctorMarkersData from './DoctorMarkersData';
import '../css/App.css';



class LeafletMap extends Component {

  constructor() {

    super();

    this.state = {
      lat: 34.016,
      lng: -81.030,
      zoom: 12,
      doctorArray: []
    };

  }

  componentDidMount () {
    //console.log(this.props.doctorLocations.map(this.generateMarkers)[0]);
  }

  generateDoctorLatLong (array) {
  

    function fetchCoords (obj) {
      
      return (
        obj.lat + ", " + obj.lon
      );

    }
    
    return array.map(fetchCoords);

  }


  render() {

   
    const position = [this.state.lat, this.state.lng];
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

          <DoctorMarkersData doctorMarkers={this.props.doctorLocations.map(this.generateDoctorLatLong)} />

          {/*
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
          <Marker position={[34.015, -81.029]}>
            <Popup>
              <span>Butthole</span>
            </Popup>
          </Marker>
          <Marker position={exampleDoctor}>
            <Popup>
              <span>Veronica Hinkle, NP</span>
            </Popup>
          </Marker> */}
          
        </Map>
      </div>
    );

  }

}

module.exports = LeafletMap;
