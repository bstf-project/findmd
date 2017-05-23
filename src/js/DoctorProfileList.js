
import React from 'react';
import axios from 'axios';
//import DisplayDoctorProfiles from './displayDoctorProfiles';
// import DoctorProfiles from './DoctorProfiles';
import zipcodes from 'zipcodes';
import LeafletMap from './LeafletMap.js';
import _ from 'lodash';



var defaultDistance = 1;
var defaultAmountReturned = 10;

class DoctorProfileList extends React.Component {

	constructor() {
		super();

		this.showPosition = this.showPosition.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.updateCoords = this.updateCoords.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addDoctor = this.addDoctor.bind(this);
		this.subtractDoctor = this.subtractDoctor.bind(this);
		this.increaseRadius = this.increaseRadius.bind(this);
		this.decreaseRadius = this.decreaseRadius.bind(this);
		this.filterMedical = this.filterMedical.bind(this);
		this.filterDental = this.filterDental.bind(this);
		this.filterVision = this.filterVision.bind(this);

		this.state = {
			resultArr: undefined,
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors?location=',
			coordinates: '40.713,-74.006', //Defaulted to NYC Coordinates
			// doctorTypeFilter: 'all',
			showMedical: [],
			showDental: [],
			showVision: [],
			all: true,
			medical: false,
			dental: false,
			vision: false,
			distance: defaultDistance,
			api_key: '10ed4e3765d043de9fad1d2f6bc3153a',
			amountReturned: defaultAmountReturned,
			skip_limit: 0,
			map_zoom: 13

		}

		this.getLocation();


	};
// Toronto coordinates: 34.052,-118.243
// Los Angeles, CA coordinates: 34.0522,-118.2437

	showPosition(position) {

    	var userPosition = String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7);



	    this.setState({coordinates : userPosition});



		this.APIcall();
	}

	getLocation() {

	    if (navigator.geolocation) {
	    	console.log(navigator.geolocation.getCurrentPosition(this.showPosition));
	        navigator.geolocation.getCurrentPosition(this.showPosition);

	    } else {

	    	this.APIcall();


	    }

	}


	APIcall() {

		console.log("API call " + this.state.coordinates);

		//Skip limit affects if small town doctors get returned, apparently
		axios.get(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip='+ this.state.skip_limit +'&limit='+this.state.amountReturned+'&user_key=' + this.state.api_key)

			.then(response =>
				{this.setState({resultArr: response.data.data});
				{this.setState({showMedical: response.data.data.filter(function (obj) {return obj.specialties[0].category === 'medical'})})};

				{this.setState({showVision: response.data.data.filter(function (obj) {return obj.specialties[0].category === 'vision'})})};

				{this.setState({showDental: response.data.data.filter(function (obj) {return obj.specialties[0].category === 'dental'})})};



				console.log(this.state.showMedical);
				console.log(this.state.showDental);
				console.log(this.state.showVision);
				console.log(this.state.resultArr);

			console.log(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip='+ this.state.skip_limit +'&limit='+this.state.amountReturned+'&user_key=' + this.state.api_key);
		});

	}



	updateCoords (e) {
		if (Number(e.target.value) && e.target.value.length === 5) {
			//e.preventDefault();

			console.log("Zipcode LAT " + zipcodes.lookup(e.target.value).latitude );
			console.log("Zipcode Lon " + zipcodes.lookup(e.target.value).longitude);
			var convertedCoords= String(Number(zipcodes.lookup(e.target.value).latitude).toFixed(3) + "," + Number(zipcodes.lookup(e.target.value).longitude).toFixed(3));
			console.log(convertedCoords);

			var zipcodeObject = zipcodes.lookup(e.target.value);
			console.log(zipcodeObject);
		}


			this.setState({coordinates: convertedCoords})

		if (e.keyCode === 13 )	{
			e.preventDefault();
			this.setState({distance: defaultDistance});
			this.setState({amountReturned: defaultAmountReturned})
			this.APIcall();
		}

	}



	handleChange (e) {

		this.APIcall();

	}

	mapLocations (obj) {
		return obj.practices;
		//returns an array of objects inside of it
	}

	addDoctor () {

		this.setState({
			amountReturned: this.state.amountReturned + 10
		})

		this.APIcall();

	}

	subtractDoctor () {
		if  (this.state.amountReturned > 10) {
		this.setState({
			amountReturned: this.state.amountReturned - 10
		})
	}

		this.APIcall();

	}



	increaseRadius () {
		this.setState({
			distance: this.state.distance + 10
		})

		this.APIcall();
	}

	decreaseRadius () {

		if  (this.state.distance > 10) {
		this.setState({
			distance: this.state.distance - 10
		})
	}

		this.APIcall();
	}

	doctorTypeFilterAll () {

		// this.setState({
		// 	doctorTypeFilter: 'all'
		// })

		this.setState({all: !this.state.all})
	}


	filterMedical () {

		// this.setState({resultArr: this.state.resultArr.filter(function (obj) {return obj.specialties[0].category === 'medical'})})
		// this.setState({
		// 	doctorTypeFilter: 'medical'
		// })
		this.setState({medical: !this.state.medical})


	}

	filterDental () {

		// this.setState({resultArr: this.state.resultArr.filter(function (obj) {return obj.specialties[0].category === 'dental'})})
		// this.setState({
		// 	doctorTypeFilter: 'dental'
		// })
		this.setState({dental: !this.state.dental})

	}

	filterVision () {

		// this.setState({resultArr: this.state.resultArr.filter(function (obj) {return obj.specialties[0].category === 'vision'})})
		// this.setState({
		// 	doctorTypeFilter: 'vision'
		// })
		this.setState({vision: !this.state.vision})

	}

	render () {

		if(this.state.resultArr !== undefined) {
			var arrState;
			if (this.state.medical && this.state.dental && this.state.vision) {
				arrState = this.state.resultArr;
			}
			else if (this.state.medical) {
				arrState = this.state.showMedical;
			}
			else if (this.state.dental) {
				arrState = this.state.showDental;
			}
			else if (this.state.vision) {
				arrState = this.state.showVision;
			}
			else {arrState = this.state.resultArr}


			return (
				<div>
					<div className="wrap">
					<div className="search-wrapper">
						<form id="zipcode">
					        <input
							className="search-box"
					          type="text"
					          placeholder="Search by zip code"
					          ref="filterTextInput"
					          onKeyDown={this.updateCoords}

					        />

			      		</form>

			      		<button className="search-button search-button-primary btn-primary" onClick={this.handleChange}>Find Doctors</button>


				      {/*<form className="search-button checkbox-filter">
				      	<input type="checkbox" className="filter-checkbox" name="doctorType" value="medical" onClick={this.filterMedical} /> Medical<br/>
				      	<input type="checkbox" className="filter-checkbox" name="doctorType" value="dental" onClick={this.filterDental} /> Dental<br/>
				      	<input type="checkbox" className="filter-checkbox" name="doctorType" value="vision" onClick={this.filterVision} /> Vision<br/>
				      </form>*/}

								<div className="search-radius-wrap">
								<button className="search-button doctors-radius" disabled>Radius <h2>{this.state.distance} mi</h2></button>
								<button className="plus-button" onClick={this.increaseRadius}>+</button>
								<button className="minus-button" onClick={this.decreaseRadius}>-</button>
							</div>
						<div className="doctors-return-wrap">
						<button className="search-button  doctors-returned" disabled>Toggle Amount</button>
						<button className="plus-button" onClick={this.addDoctor}>+</button>
						<button className="minus-button" onClick={this.subtractDoctor}>-</button>
					</div>


						</div>
					</div>

					<LeafletMap
					centerLocation={this.state.coordinates}
					doctorLocations={
						arrState
						// .filter(drOffice => {
						// 	if (this.state.doctorTypeFilter === 'all') return true;
						// 	else {
						// 		if(this.state.doctorTypeFilter === drOffice.specialties[0].category) return true
						// 		else return false
						// 	}
						// })
						// // .filter(drOffice => {
						// // 	return this.state.showVision
						// // })
						// // .filter(drOffice => {
						// // 	return this.state.showDental
						// // })
						.map(this.mapLocations)}

							doctorArray={arrState}
							distance={this.state.distance}
							mapZoom={this.state.map_zoom}
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

// if (this.state.showMedical && this.state.showDental && this.state.showVision) {
							// 	return drOffice;
							// }
							// else {


							// }
