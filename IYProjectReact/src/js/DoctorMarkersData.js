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

			//console.log("i: " + this.props.doctorMarkers[i]);

			for (var j = 0; j < this.props.doctorMarkers[i].length; j++) {


				//var positionString = this.props.doctorMarkers[i][j];
				var positionStringLat = this.props.doctorMarkers[i][j].slice(0, 7);
				var positionStringLon = this.props.doctorMarkers[i][j].slice(10);

				var positionStringArray = [];
				// console.log("LAT " + positionStringLat);
				// console.log("LON " + positionStringLon);

				positionStringArray.push(Number(positionStringLat), Number(positionStringLon));


				ArrayOfMarkers.push(
          <Marker position={positionStringArray}>
              <Popup>

              <a onClick={this.click} href={"#" +this.props.profileUIDS[i]}>

              		<h2>{this.props.doctorNames[i]}</h2>
                      
              </a>



              </Popup>
              		}
          </Marker>
      );

			}

		}

		return ArrayOfMarkers

	}

	render() {

		console.log(this.props.profileUIDS);

		return (

			<div>
				{this.generateDoctorMarkers()}
			</div>
		);

	}

}

module.exports = DoctorMarkersData;
