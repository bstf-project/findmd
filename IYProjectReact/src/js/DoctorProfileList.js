import React from 'react';
import axios from 'axios';
import DoctorProfiles from './DoctorProfiles';

class DoctorProfileList extends React.Component {

	constructor() {
		super();

		this.showPosition = this.showPosition.bind(this);
		this.getLocation = this.getLocation.bind(this);

		this.state = {
			resultArr: undefined,
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors?location=',
			coordinates: '40.713,-74.006', //Defaulted to NYC Coordinates
			distance: 1,
			api_key: '789b28d7d74840d2eb449527c4d61127'
		}

		this.getLocation();

	};

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

	    }else {

	    	this.APIcall();

	    }

	}

	APIcall() {

		console.log("API call " + this.state.coordinates);

		//API call using axios.get
		axios.get(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip=0&limit=5&user_key=' + this.state.api_key)
			.then(response => {this.setState({resultArr: response.data.data});
			//console.log(this.state.resultArr); 
		});

	}

	render () {

		if(this.state.resultArr !== undefined) {

			return (
				<DoctorProfiles doctorData={this.state.resultArr}/>
			);

		}
		else {
		
			return (

				<div>

					Loading...

				</div>

			);

		}
		
	}
}
module.exports = DoctorProfileList;
