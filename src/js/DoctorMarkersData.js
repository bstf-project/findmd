import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';


class DoctorMarkersData extends Component {

	constructor() {

		super();

		this.generateDoctorMarkers = this.generateDoctorMarkers.bind(this);

		this.state = {
			doctorResultsArr: undefined,
			doctor_url: 'https://api.betterdoctor.com/2016-03-01/doctors/',
			doctor_uid: '333d4bb6fcf640e18e93b11b00fe09eb',
			api_key: '789b28d7d74840d2eb449527c4d61127'

		}

	}

	click () {
		console.log("HELLO");
	}

	generateDoctorMarkers() {
		var ArrayOfMarkers = [];
		//this.props.DoctorMarkersData
		//console.log("### " + this.props.doctorMarkers);


		for (var i = 0; i < this.props.doctorMarkers.length; i++) {
			//Swaps out BetterDoctor's generic image with our own if they don't have the doctor's picture
			var imgSrc = this.props.doctorArray[i].profile.image_url;

			if (this.props.doctorArray[i].profile.image_url.slice(39) === "general_doctor_male.png") {

				imgSrc = "http://www.bloomfieldhealth.org/assets/images/doctors/9.png";

			}

			else if (this.props.doctorArray[i].profile.image_url.slice(39) === "general_doctor_female.png") {

				imgSrc = "https://img.clipartfest.com/3473fe27a237ac460a90f94f8fd47b9b_doctor-icon-doctor-icon-clipart_2100-2400.png";

			}



			 for (var j = 0; j < this.props.doctorMarkers[i].length; j++) {

			 	//Testing location distance and returning a statement
					// 	//if (item.distance < 10) {

				var statement = this.props.doctorDistance[i][j] + " miles from your location";

				if (this.props.doctorDistance[i][j] === 1) {
				 	statement = this.props.doctorDistance[i][j] + " mile from your location";
				 }
				 else if (this.props.doctorDistance[i][j] < 1) {
				 	statement = " < 1 mile from your location";
				 }


				//var positionString = this.props.doctorMarkers[i][j];

				var positionStringLat = this.props.doctorMarkers[i][j].slice(0, 7);
				var positionStringLon = this.props.doctorMarkers[i][j].slice(10);



				var positionStringArray = [];

				positionStringArray.push(Number(positionStringLat), Number(positionStringLon));


				ArrayOfMarkers.push(
		          <Marker key={"key" + i + j} position={positionStringArray}>
		              <Popup>

		              <a onClick={this.click} href={"#"}>

		              		<h2 className="doc-name">{this.props.doctorNames[i]}</h2>
			              	<img className="docimg" src={imgSrc} alt={this.props.doctorNames[i]} />

											<div className="contact-wrapper">

											<a className="mobile" href={"tel:" + this.props.doctorPhones[i][j]}>
			              	<i className="mobile fa fa-mobile fa-3x"><span className="span-class"></span></i></a>
										</div>

			              	<a className="google-search" href={"https://google.com/#q=" + this.props.doctorArray[i].profile.first_name + "+" + this.props.doctorArray[i].profile.last_name + "+" + this.props.doctorArray[i].profile.title} target="_blank">
			              	<i className="google-search fa fa-google fa-2x"><span className="span-class "></span></i></a>

							<h2 className="specialties disabled">{this.props.doctorArray[i].specialties[0] !== undefined ? this.props.doctorArray[i].specialties[0].name : null}</h2>

		              		<h2 className="address disabled">
				              {this.props.doctorAddress[i][j]}
				              <p>{statement}</p>
			              	</h2>







		              </a>



		              </Popup>
		              		}
		              		}
		              		}
		          </Marker>
		      	);

			}

		}

		return ArrayOfMarkers

	}

	render() {



		return (
		
			<div>
				{this.generateDoctorMarkers()}
			</div>
		);

	}

}

module.exports = DoctorMarkersData;
