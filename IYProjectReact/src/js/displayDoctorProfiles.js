import React from 'react';
import DoctorProfiles from './DoctorProfiles';

class DisplayDoctorProfiles extends React.Component {
	constructor () {

		super ();

		this.onClick = this.onClick.bind(this);		

		this.state = {
			expandDiv: false,
			doctorArray: this.props.DoctorData
		}

	}

	onClick (e) {
		e.preventDefault();
		this.setState({expandDiv: !this.state.expandDiv})
	}

	render () {
		var doctor_name = this.props.doctorData.map(function (obj) {return obj.profile.first_name});

		return (
			<div>
				I HOPE THIS WORKS
				<DoctorProfiles
				doctorData = {this.state.doctorArray}
				 />
			</div>

		)
	}
}

module.exports = DisplayDoctorProfiles;