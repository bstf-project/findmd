import React from 'react';
import '../css/App.css';
import API from './API';
import Doctors from './doctors';
import Location from './location';

var api_key = "789b28d7d74840d2eb449527c4d61127";
var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=34.000,-81.035,100&skip=2&limit=10&user_key=' + api_key;
class App extends React.Component {

 render() {
   return (
     <div className = "App">
       Hello
       <API />
       <Doctors />
       <Location />
     </div>
   );
 }

} 

module.exports = App;
