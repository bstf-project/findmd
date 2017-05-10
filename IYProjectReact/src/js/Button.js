import React from 'react';
//import '../css/App.css';

class Button extends React.Component {
  render() {
    return (
      <button {...this.props}>
        click
      </button>
    );
  }  
}

module.exports = Button;