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


  render() {
    var centerLat = Number(this.props.centerLocation.slice(0, 4));
    var centerLng = Number(this.props.centerLocation.slice(6));
    console.log("LAT " + centerLat);
    console.log("LON " + centerLng);
    console.log(Number(this.props.centerLocation.length));

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

          <DoctorMarkersData doctorMarkers={this.props.doctorLocations.map(this.generateDoctorLatLong)} />

          
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
