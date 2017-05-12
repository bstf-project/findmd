import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';

class DoctorMarkersData extends Component {

	constructor() {

		super();

		this.generateDoctorMarkers = this.generateDoctorMarkers.bind(this);

	}	

	generateDoctorMarkers() {
		var ArrayOfMarkers = [];
		//this.props.DoctorMarkersData
		//console.log("### " + this.props.doctorMarkers);


		for (var i = 0; i < this.props.doctorMarkers.length; i++) {

			//console.log("i: " + this.props.doctorMarkers[i]);

			for (var j = 0; j < this.props.doctorMarkers[i].length; j++) {

				
				var positionString = this.props.doctorMarkers[i][j];
				var doctor = this.props.doctorNames[i][j];
				var positionStringLat = this.props.doctorMarkers[i][j].slice(0, 7); 

				var positionStringLon = this.props.doctorMarkers[i][j].slice(10);

				var positionStringArray = [];
				// console.log("LAT " + positionStringLat);
				// console.log("LON " + positionStringLon);

				positionStringArray.push(Number(positionStringLat), Number(positionStringLon));

				
				
				ArrayOfMarkers.push(
					<Marker position={positionStringArray}>
						<Popup>
			              <span>{this.props.doctorNames[i][j]}</span>
			            </Popup>
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
