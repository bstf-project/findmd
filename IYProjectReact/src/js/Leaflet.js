import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import markericon from 'leaflet/dist/images/marker-icon.png';


class Leaflet extends Component {

  constructor() {

    super();

    this.state = {
      lat: 34.016,
      lng: -81.030,
      zoom: 15,
    };

  }

  render() {

    const position = [this.state.lat, this.state.lng];

    return (
      <div >
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="#'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker src={markericon} position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );

  }

}

export default Leaflet;
