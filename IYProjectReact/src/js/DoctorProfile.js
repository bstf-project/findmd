import React from 'react';
import axios from 'axios';

function returnDistance (obj) {
	var statement = Math.round(obj.distance) + " miles away";
	
	if (Math.round(obj.distance) === 1) {
	 	statement = Math.round(obj.distance) + " mile away";
	 }

	return (
		<div className="doctor-offices">
			<h2>{obj.visit_address.street + " " + obj.visit_address.city + ", " + obj.visit_address.state + " " + obj.visit_address.zip}</h2>
			<p>{statement}</p>
		</div>
		
	);
}

function returnSpecialties (obj) {
	return <p>{obj.description}</p>;
}


function doctorInfo (obj) {
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
			<h3>{obj.profile.first_name + " " + obj.profile.last_name}</h3>


			<div className="doc-image">
				<img className="docimg" src={doctorSrc} alt={obj.profile.last_name} />		
			</div>

			<div>
				<h4>About: </h4>
				<p className="doc-bio">{obj.profile.bio}</p>
			</div>			

			<div>
				<h4>Specialties:</h4>
				<p className="doc-specialties">{obj.specialties.map(returnSpecialties)}</p>
			</div>

			<div>
				<h4>Offices</h4>
				<p className="doc-distance">{obj.practices.map(returnDistance)}</p>
			</div>			
		</div>
	);
}

class DoctorProfile extends React.Component {

	constructor() {
		super();

		this.state = {
			resultArr: [],
			testStatement: undefined,
			latLong: [0, 6, 4, 57,456354 ,34573678 ,45645],
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors?location=',
			coordinates: '34.000,-81.035',
			distance: 1,
			api_key: '789b28d7d74840d2eb449527c4d61127'
		}

	};

	componentWillMount() {


		function getLocation() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function showPosition(position) {

		    console.log("Position: " + String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7));

		    return String(position.coords.latitude).slice(0, 6) + "," + String(position.coords.longitude).slice(0, 7);
		   
		});

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

		//API call using axios.get
			axios.get(this.state.resource_url + this.state.coordinates + ',' + this.state.distance + '&skip=0&limit=5&user_key=' + this.state.api_key)
				.then(response => {this.setState({resultArr: response.data.data});
				console.log(this.state.resultArr); 
			});
		


	}

	render () {
		
		return (
			<div className="info">
				{this.state.resultArr.map(doctorInfo)}
				Hello?
				{this.state.latLong}
				Wtf

			</div>
		);
		
	}
}
module.exports = DoctorProfile;
