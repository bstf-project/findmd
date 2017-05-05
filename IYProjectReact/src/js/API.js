import React from 'react';
import axios from 'axios';



var api_key = "789b28d7d74840d2eb449527c4d61127";
//var coordinates = "40.7128,-74.006"; //NY City coordinates
var coordinates = "34.000,-81.035"; //Lat and Lon values of Columbia, SC
var distance = 30; //Want to toggle this

//Columbia doctors within a 1 mile radius of columbia_coord
var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + coordinates+ ',' + distance + '&skip=0&limit=10&user_key=' + api_key;

function doctorBio (obj) {
	return <p>{obj.profile.bio}</p>;
}

function returnDistance (obj) {
	var statement = Math.round(obj.distance) + " miles away";

	if (obj.distance > distance) {
		statement = "TOO FAR";
	}
	else if (obj.distance < 1) {
		statement = "< " + Math.round(obj.distance) +" mile away";
	}
	else if (Math.round(obj.distance) == 1) {
		statement = " mile away";
	}
	return <p>{statement}</p>;
}

function returnSpecialties (obj) {
	return <p>{obj.description}</p>;
}


function doctorName (obj) {
	console.log(navigator.geolocation.getCurrentPosition(function (position){
		return position.coords.latitude + " " + position.coords.longitude;
	})); //This is returning undefined
	return (
		<div className = "api-data container">
			<h4>{obj.profile.first_name + " " + obj.profile.last_name}</h4>


		<div className="doc-image">

			{ 
				(obj.profile.image_url.slice(39) == "general_doctor_male.png" || obj.profile.image_url.slice(39) == "general_doctor_female.png") ?  
				<i className="fa fa-user-md fa-5x" aria-hidden="true"></i> :
				<img className="docimg" src={obj.profile.image_url} alt={obj.profile.last_name} 
				 />
			}
			
			
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

function doctorImage (obj) {

}

class API extends React.Component {

	constructor() {
		super();

		this.state = {
			resultArr: [],
			latLong: []
		}

	};

	componentWillMount() {


		console.log("This first");
		axios.get(resource_url)
			.then(response => {this.setState({resultArr: response.data.data});
			console.log(this.state.resultArr); 
		});


	}

	render () {
		
		return (
			<div className = "info">
				{this.state.resultArr.map(doctorName)}
	
			</div>
		);
		
	}
}
module.exports = API;
