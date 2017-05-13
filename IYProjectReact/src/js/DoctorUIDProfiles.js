import React from 'react';
import axios from 'axios';



class DoctorUIDProfiles extends React.Component {

	constructor () {

		super();

		this.state = {
			doctor_uid: undefined,
			resource_url: 'https://api.betterdoctor.com/2016-03-01/doctors/',
			api_key: '789b28d7d74840d2eb449527c4d61127'
		}

	}

	APIcall2() {


	axios.get(this.state.resource_url + '333d4bb6fcf640e18e93b11b00fe09ebuser_key=' + this.state.api_key)

		.then(response => {this.setState({resultArr: response.data.data});

		console.log(this.state.resultArr);
	});
}

	//'https://api.betterdoctor.com/2016-03-01/doctors/'+ doctor_uid + '?user_key=' + api_key

	//'https://api.betterdoctor.com/2016-03-01/doctors/'+ doctor_uid + '?user_key=' + api_key

	render () {
		return (
			<div>
			
				IS THIS RENDERING?!
				{this.APIcall2()}


			</div>
		)
	}

}
module.exports = DoctorUIDProfiles;
