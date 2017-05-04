import React from 'react';
import axios from 'axios';


var api_key = "789b28d7d74840d2eb449527c4d61127";
var columbia_coord = "34.000,-81.035"; //Lat and Lon values of Columbia, SC

//Columbia doctors within a 1 mile radius of columbia_coord
var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + columbia_coord + ',1&skip=0&limit=10&user_key=' + api_key;

function doctorBio (obj) {
	return <p>{obj.profile.bio}</p>;
}

function returnDistance (obj) {
	return <p>{obj.distance}</p>
}

function doctorName (obj) {
	return (
		<div>
			<p>{obj.profile.first_name + " " + obj.profile.last_name}</p>
			<img src={obj.profile.image_url} alt={obj.profile.last_name} />
			<p>{obj.profile.bio}</p>
			<p>{obj.practices.map(returnDistance)}</p>
		</div>
	);
}

function doctorImage (obj) {
	return <img src={obj.profile.image_url} alt={obj.profile.last_name} />
}

class API extends React.Component {

	constructor() {
		super();

		this.state = {
			number: "2",	
			resultArr: []
		}

	};

	componentWillMount() {

		axios.get(resource_url)
			.then(response => {this.setState({resultArr: response.data.data});
			console.log(this.state.resultArr); //It's returning this but won't inject into page
		});


	}

	render () {
		
		return (
			<div className = "something">
				{this.state.resultArr.map(doctorName)}
				
				
			</div>
		);
		
	}
}
module.exports = API;
