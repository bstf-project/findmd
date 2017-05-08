import React from 'react';
import '../css/App.css';


class Header extends React.Component {

 render() {
   return (
	<div className="title-search-wrapper">

      <div className="title-name"></div>


          <button {...this.props} id="search-button" className="search-button btn btn-primary" type="button">Search
          </button>
   		<button className="search-button btn btn-primary" type="button">Filter</button>
      </div>
   );
 }

}

module.exports = Header;
