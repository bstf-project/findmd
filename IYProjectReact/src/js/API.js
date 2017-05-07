import React from 'react';
import axios from 'axios';



var api_key = "789b28d7d74840d2eb449527c4d61127";
//var coordinates = "40.7128,-74.006"; //NY City coordinates
var coordinates = "34.000,-81.035"; //Lat and Lon values of Columbia, SC
var distance = 30; //Want to toggle this

//var coordinates = getLocation();
//Columbia doctors within a 1 mile radius of columbia_coord


var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + coordinates + ',' + distance + '&skip=0&limit=10&user_key=' + api_key;

function returnDistance (obj) {
	var statement = Math.round(obj.distance) + " miles away";

	if (obj.distance > distance) {
		statement = "TOO FAR";
	}
	else if (obj.distance < 1) {
		statement = "< " + Math.round(obj.distance) +" mile away";
	}
	else if (Math.round(obj.distance) === 1) {
		statement = " mile away";
	}
	return <p>{statement}</p>;
}

function returnSpecialties (obj) {
	return <p>{obj.description}</p>;
}


function doctorName (obj) {
	//Checking for doctor images and swapping out Better Doctor's placeholder image with our own
	var doctorSrc = obj.profile.image_url;
	if (obj.profile.image_url.slice(39) === "general_doctor_male.png") {
		doctorSrc = "http://www.bloomfieldhealth.org/assets/images/doctors/9.png";
	}
	else if (obj.profile.image_url.slice(39) === "general_doctor_female.png") {
		doctorSrc = "https://img.clipartfest.com/3473fe27a237ac460a90f94f8fd47b9b_doctor-icon-doctor-icon-clipart_2100-2400.png";
	}


	return (
		<div className="api-data container">	
			<h4>{obj.profile.first_name + " " + obj.profile.last_name}</h4>


			<div className="doc-image">
				<img className="docimg" src={doctorSrc} alt={obj.profile.last_name} />		
			</div>


			<p className="doc-distance">{obj.practices.map(returnDistance)}</p>
			<div>
				<h4>Specialties:</h4>
				<p className="doc-specialties">{obj.specialties.map(returnSpecialties)}</p>
			</div>
			<div>
				<h4>About: </h4>
				<p className="doc-bio">{obj.profile.bio}</p>
			</div>
		</div>
	);
}

class API extends React.Component {

	constructor() {
		super();

		this.state = {
			resultArr: [],
			testStatement: undefined,
			latLong: undefined
		}

	};

	componentWillMount() {


		function showPosition(position) {

		    console.log("Position: " + String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7));

		    return String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7);
		   
		}

		function getLocation() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);

		    } else {
		        alert("Geolocation is not supported by this browser.");
		    }
		}


		function Hello () {return "Testing"}

		this.setState({testStatement: Hello()});
		this.setState({latLong: getLocation()});

		
		
	}

	componentDidMount() {
		console.log(this.state.testStatement);
		console.log(this.state.latLong);

		
			axios.get(resource_url)
				.then(response => {this.setState({resultArr: response.data.data});
				console.log(this.state.resultArr); 
			});
		


	}

	render () {
		
		return (
			<div className="info">
				{this.state.resultArr.map(doctorName)}

			</div>
		);
		
	}
}
module.exports = API;
