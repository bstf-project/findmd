import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import DoctorMarkersData from './DoctorMarkersData';
import '../css/App.css';



class LeafletMap extends Component {


  constructor() {


    super();

    this.changeZoom = this.changeZoom.bind(this);

    this.state = {
      zoom: 13,
      coordinates: undefined

    };

    // this.changeZoom();    

  }

  changeZoom () {
    var zoom;

    if (this.props.distance > 31) {
      zoom = 7;
    }
    if (this.props.distance > 21) {
       zoom = 9
    }

    else if (this.props.distance > 11) {
       zoom = 10
    }

    else if (this.props.distance > 1) {
       zoom = 12
    }
    else {zoom = 13}
    return zoom;
  }


  generateDoctorLatLong (array) {
  
    function fetchCoords (obj) {    
      return (
        obj.lat + ", " + obj.lon
      );
    }
    
    return array.map(fetchCoords);

  }

  generateDistance (array) {
    function fetchDistance (obj) {
      return Math.round(obj.distance);
    }
    return array.map(fetchDistance)
  }

  generateDoctorAddress (array) {
    function fetchAddress (obj) {
      return (obj.visit_address.street + " " + obj.visit_address.city + ", " + obj.visit_address.state + " " + obj.visit_address.zip);
    }
    return array.map(fetchAddress);
  }

   generateDoctorLatLong2 (array) {

    return array[0].lat + "," + array[0].lon;

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

  generatePhoneNumbers (array) {
    function fetchPhone (obj) {
      return Number(obj.number);
    }

    return array.map(fetchPhone);
  }


  render() {
    var centerLat;
    var centerLng;

    if (Number(this.props.centerLocation !== undefined)) { 
      centerLat = Number(this.props.centerLocation.slice(0, 6));
      centerLng = Number(this.props.centerLocation.slice(7));
    }

    var position = [centerLat, centerLng];

    return (
      <div >
        
        <Map center={position} zoom={this.changeZoom()} animate={true} useFlyTo={true}>
          <TileLayer
            attribution='&copy; <a href="#'
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
          />

          <DoctorMarkersData 
            radius={this.props.distance}
            doctorArray={this.props.doctorArray}
            doctorMarkers={this.props.doctorLocations.map(this.generateDoctorLatLong)}
            doctorDistance={this.props.doctorLocations.map(this.generateDistance)}
            doctorAddress={this.props.doctorLocations.map(this.generateDoctorAddress)}
            doctorPhones={this.props.doctorLocations.map(function (arr) {return arr.map(function (obj) { return Number(obj.phones[0].number)})})}
            doctorMarkers2={this.props.doctorLocations.map(this.generateDoctorLatLong2)}
            doctorUIDS={this.props.doctorLocations.map(this.generateDoctorUIDS)}
            profileUIDS={this.props.doctorArray.map(function(obj) {return obj.uid})}
            doctorNames={this.props.doctorArray.map(function(obj) {return obj.profile.first_name + " " + obj.profile.last_name + ", " + obj.profile.title })}
             />
            }
            }

          
          <Marker position={position}>
            <Popup>
             <h2>My Location</h2>
              
            </Popup>
          </Marker>

          
        </Map>
      </div>
    );

  }

}

module.exports = LeafletMap;
