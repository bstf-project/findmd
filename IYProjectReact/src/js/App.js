import React from 'react';
import '../css/App.css';
import Header from './Header';
import DoctorProfileList from './DoctorProfileList';
//import Doctors from './doctors';

class App extends React.Component {

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
