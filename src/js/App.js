import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
// import LeafletMap from './LeafletMap';
import DoctorProfileList from './DoctorProfileList';
/*import ReallySmoothScroll from 'really-smooth-scroll';
import { hashHistory } from 'react-router'

hashHistory.listen(() => {
  window.scrollTo(0, 0);
});

ReallySmoothScroll.shim();*/

//import Doctors from './doctors';

class App extends Component {

 render() {
   return (
     <div className="App">

      <Header />

      <DoctorProfileList />

     </div>
   );
 }
}

module.exports = App;


// Google Maps API KEY: AIzaSyC2NcoiiaD1fEQ3dIjewq6IouHDcBABOwc
