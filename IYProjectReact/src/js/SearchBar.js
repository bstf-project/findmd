import React from 'react';


class SearchBar extends React.Component {

	constructor() {
	super();

	//Copied over from DoctorProfileList
	this.handleChange = this.handleChange.bind(this);
	// this.getLocation = this.getLocation.bind(this);

	this.state = {
		searchValue: "Enter your zip code"

	}



	};

	displaySearchBar () {
		return (
			<div>
				'Search Bar JS'

	      	</div>
		);
	}

	handleChange (e) {

			{this.setState({searchValue: e.target.value})}
			console.log('jalapeno');
	}



	render () {
		return (

		<div>
			{this.displaySearchBar()}
				<form>
			        <input
					className="search-box"	        	
			          type="text"
			          value={this.state.searchValue}
			          ref="filterTextInput"
			          onChange={this.handleChange}
			        />

		      	</form>

      	</div>
		);
	}

}

module.exports = SearchBar;