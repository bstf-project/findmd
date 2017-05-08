import React from 'react';





class DoctorProfiles extends React.Component {

	generateDoctors(item) {

		console.log(item);

		function returnSpecialties (item) {
			return <p>{item.description}</p>;
		}

		function returnDistance (item) {
			var statement = Math.round(item.distance) + " miles from your location";

			if (Math.round(item.distance) === 1) {
			 	statement = Math.round(item.distance) + " mile from your location";
			 }
			 else if (Math.round(item.distance) < 1) {
			 	statement = " < 1 mile from your location";
			 }

			return (
				<div className="doctor-offices">
					<h2>{item.visit_address.street + " " + item.visit_address.city + ", " + item.visit_address.state + " " + item.visit_address.zip}</h2>
					<p>{statement}</p>
				</div>
				
			);
		}

		//Checking for doctor images and swapping out Better Doctor's placeholder image with our own
		var doctorSrc = item.profile.image_url;

		if (item.profile.image_url.slice(39) === "general_doctor_male.png") {

			doctorSrc = "http://www.bloomfieldhealth.org/assets/images/doctors/9.png";

		}

		else if (item.profile.image_url.slice(39) === "general_doctor_female.png") {

			doctorSrc = "https://img.clipartfest.com/3473fe27a237ac460a90f94f8fd47b9b_doctor-icon-doctor-icon-clipart_2100-2400.png";

		}

		return (
			<div className="api-data container">	
				<h3>{item.profile.first_name + " " + item.profile.last_name + ", " + item.profile.title}</h3>


				<div className="doc-image">
					<img className="docimg" src={doctorSrc} alt={item.profile.last_name} />		
				</div>

				<div>
					<h4>About: </h4>
					<p className="doc-bio">{item.profile.bio}</p>
				</div>			

				<div>
					<h4>Specialties:</h4>
					<div className="doc-specialties">{item.specialties.map(returnSpecialties)}</div>
				</div>

				<div>
					<h4>Offices</h4>
					<div className="doc-distance">{item.practices.map(returnDistance)}</div>
				</div>			
			</div>
		);

	}



	render() {

		return (

			<div>

				{this.props.doctorData.map(this.generateDoctors)}


			</div>

		)

	}

}
module.exports = DoctorProfiles;
