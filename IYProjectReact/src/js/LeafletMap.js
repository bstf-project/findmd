import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../css/App.css';



class LeafletMap extends Component {

  constructor() {

    super();

    this.state = {
      lat: 34.016,
      lng: -81.030,
      zoom: 12,
    };

  }

  generateMarkers (obj, i) {
    console.log(obj);
    return obj.practices;
  }


  render() {

    const position = [this.state.lat, this.state.lng];
    const anotherPosition = [34.015, -81.029];

    return (
      <div >

        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="#'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
          <Marker position={anotherPosition}>
            <Popup>
              <span>Butthole</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );

  }

}

export default LeafletMap;
