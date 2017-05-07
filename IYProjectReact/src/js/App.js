import React from 'react';
import '../css/App.css';
import Header from './Header';
import API from './API';
//import Doctors from './doctors';

class App extends React.Component {

  constructor() {
    super();
    
    this.state = {
      clicked: false
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      clicked: true
    });
  }

 render() {
   return (
     <div className="App">
       
       <Header onClick={this.handleClick} />
        {this.state.clicked ? <API /> : null} 
      
     </div>
   );
 }

} 

module.exports = App;
