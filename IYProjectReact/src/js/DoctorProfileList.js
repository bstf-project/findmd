import React from 'react';
import axios from 'axios';
import DoctorProfiles from './DoctorProfiles';
import zipcodes from 'zipcodes';
import LeafletMap from './LeafletMap.js';





class DoctorProfileList extends React.Component {

	constructor() {
		super();

		this.showPosition = this.showPosition.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.updateCoords = this.updateCoords.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addDoctor = this.addDoctor.bind(this);
		this.increaseRadius = this.increaseRadius.bind(this);


		this.state = {
			resultArr: undefined,
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors?location=',
			coordinates: '40.713,-74.006', //Defaulted to NYC Coordinates
			distance: 10,
			api_key: '789b28d7d74840d2eb449527c4d61127',
			amountReturned: 10,
			skip_limit: 0
			
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
		//console.log(zipcodes.lookupByName('Columbia', 'SC'));
		// console.log("HILLSLAT: " + hills.latitude);
		// console.log("HILLSLONG: " + hills.longitude);
		//API call using axios.get

		//Skip limit affects if small town doctors get returned, apparently
		axios.get(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip='+ this.state.skip_limit +'&limit='+this.state.amountReturned+'&user_key=' + this.state.api_key)
			.then(response => {this.setState({resultArr: response.data.data});
			console.log(this.state.resultArr);
			console.log(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip='+ this.state.skip_limit +'&limit='+this.state.amountReturned+'&user_key=' + this.state.api_key);
		});

	}


	updateCoords (e) {
		if (e.target.value.length === 5 && e.keyCode === 13 ) {
			e.preventDefault();

			console.log("Zipcode LAT " + zipcodes.lookup(e.target.value).latitude );
			console.log("Zipcode Lon " + zipcodes.lookup(e.target.value).longitude);
			var convertedCoords= String(Number(zipcodes.lookup(e.target.value).latitude).toFixed(3) + "," + Number(zipcodes.lookup(e.target.value).longitude).toFixed(3));
			console.log(convertedCoords);

			var zipcodeObject = zipcodes.lookup(e.target.value);
			console.log(zipcodeObject);
		}


			this.setState({coordinates: convertedCoords})


	}



	handleChange (e) {

		this.APIcall();

	}

	mapLocations (obj) {
		return obj.practices;
		//returns an array of objects inside of it
	}

	addDoctor () {
		console.log("addDoctor button clicked!")
		this.setState({
			amountReturned: this.state.amountReturned + 10
		})

		this.APIcall();
		
	}

	increaseRadius () {
		this.setState({
			distance: this.state.distance + 10
		})

		this.APIcall();
	}


	render () {

		if(this.state.resultArr !== undefined) {

			return (
				<div>
					<div className="search-wrapper">
					<button className="search-button btn-primary" onClick={this.increaseRadius}>Within {this.state.distance} miles</button>
						<form>
					        <input
							className="search-box"
					          type="text"
					          placeholder="Search by zip code"
					          ref="filterTextInput"
					          onKeyDown={this.updateCoords}

					        />

			      		</form>
			      		<button className="search-button btn-primary" onClick={this.handleChange}>Find Doctors</button>
						<button className="search-button btn-primary" onClick={this.addDoctor}>+</button>

		      		</div>


					<LeafletMap
					centerLocation={this.state.coordinates}
					doctorLocations={this.state.resultArr.map(this.mapLocations)}
					doctorData={this.state.resultArr}
					/>


					<DoctorProfiles
					searchRadius={this.state.distance}
					doctorData={this.state.resultArr}
					/>
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
