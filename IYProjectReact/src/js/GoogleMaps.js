import React from 'react';
import Map from 'google-maps-react';
import Marker from 'google-maps-react';
import InfoWindow from 'google-maps-react';
import GoogleApiComponent from 'google-maps-react';


class GoogleMaps extends React.Component {

render() {
    return (
      <div></div>
    )
  }
};

//export class GoogleMaps extends React.Component{}

export default GoogleApiComponent ({
  apiKey: "AIzaSyAe7QrFSeLHWsMuk6u5ypawfF22qM3qqtI"
})({GoogleMaps})

module.exports = GoogleMaps;
