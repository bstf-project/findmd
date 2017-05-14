import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';
import '../css/App.css';

class DoctorMarkersData extends Component {

	constructor() {

		super();

		this.generateDoctorMarkers = this.generateDoctorMarkers.bind(this);

	}

	toggle () {
		this.setState({hide: !this.state.hide});
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

				
				//{this.props.doctorNames[i][j]} =>Put this back in if shit fucks up
				ArrayOfMarkers.push(
					<Marker position={positionStringArray}>
						<Popup>
			              
				            <a href={"#" +this.props.profileUIDS[i]}>
					            
					            <span>{this.props.doctorNames[i][j]}</span>

					        </a>
				            
			            </Popup>
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
