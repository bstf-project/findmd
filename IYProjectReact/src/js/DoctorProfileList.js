import React from 'react';
import axios from 'axios';
import DoctorProfiles from './DoctorProfiles';
import InsuranceFilter from './InsuranceFilter';
import SearchBar from './SearchBar';
import zipcodes from 'zipcodes';




class DoctorProfileList extends React.Component {

	constructor() {
		super();

		this.showPosition = this.showPosition.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.updateCoords = this.updateCoords.bind(this);
		this.handleChange = this.handleChange.bind(this);
	
		

		this.state = {
			resultArr: undefined,
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors?location=',
			coordinates: '40.713,-74.006', //Defaulted to NYC Coordinates
			distance: 1,
			api_key: '789b28d7d74840d2eb449527c4d61127',
			insurance: undefined,
		}

		this.getLocation();


	};
// Toronto coordinates: 34.052,-118.243
// Los Angeles, CA coordinates: 34.0522,-118.2437

	showPosition(position) {

    	var userPosition = String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7);

    	console.log("userPosition " + userPosition);

	    this.setState({coordinates : userPosition});

    	console.log("this.state.coordinates "+ this.state.coordinates);

		this.APIcall();
	}

	getLocation() {

	    if (navigator.geolocation) {

	        navigator.geolocation.getCurrentPosition(this.showPosition);

	    } else {

	    	this.APIcall();


	    }

	}
	

	APIcall() {

		console.log("API call " + this.state.coordinates);
		
		// var hills = zipcodes.lookup(90210);
		// console.log(hills);
		// console.log("HILLSLAT: " + hills.latitude);
		// console.log("HILLSLONG: " + hills.longitude);
		//API call using axios.get
		axios.get(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip=0&limit=50&user_key=' + this.state.api_key)
			.then(response => {this.setState({resultArr: response.data.data});
			console.log(this.state.resultArr);
		});

	}

	updateCoords (e) {
		if (e.target.value.length === 5 ) {

			var convertedCoords= String(zipcodes.lookup(e.target.value).latitude + "," +zipcodes.lookup(e.target.value).longitude);
			console.log(convertedCoords);
		}


			{this.setState({coordinates: convertedCoords})}
		

	}


	handleChange (e) {

		this.APIcall(); 

	}

	render () {

		if(this.state.resultArr !== undefined) {

			return (
				<div>

					<div className="search-wrapper">
						<form>
					        <input
							className="search-box"	        	
					          type="text"
					          placeholder="Search by zipcode"
					          ref="filterTextInput"
					          onChange={this.updateCoords}
					        />

			      		</form>
			      		<button className="search-button btn-primary" onClick={this.handleChange}>Search</button>
		      		</div>
					
					<InsuranceFilter insuranceData={this.state.resultArr} />
					<DoctorProfiles searchRadius={this.state.distance} doctorData={this.state.resultArr}/>
				</div>
			);

		}
		else {

			return (

				<div className="loading-icon">

					<center><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					<p>Fetching doctors near you</p>
					</center>
				</div>

			);

		}

	}
}
module.exports = DoctorProfileList;
