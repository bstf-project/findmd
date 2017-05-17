import React from 'react';
//import ToggleDisplay from 'react-toggle-display';
import ScrollableAnchor from 'react-scrollable-anchor'


class DoctorProfiles extends React.Component {

	 constructor() {
	    super();

	    this.onClick = this.onClick.bind(this);

	    this.state = {
	    showReply: true
    }
  }

  	onClick(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }


	generateDoctors(item, i) {

		console.log(item);

		function returnSpecialties (item, i) {
			return <p key={"key" + i}>{item.name}</p>;
		}


		function returnInsurance (item, i) {
			//item.insurance_plan.name
			return <p key={"key" + i}>{item.insurance_plan.name}</p>

		}

		// May need to use below function later
		// function returnOffices (item, i) {
		// 	//Checks if office is within search area

		// 	//if (item.distance < 10) {

		// 		var statement = Math.round(item.distance) + " miles from your location";

		// 		if (Math.round(item.distance) === 1) {
		// 		 	statement = Math.round(item.distance) + " mile from your location";
		// 		 }
		// 		 else if (Math.round(item.distance) < 1) {
		// 		 	statement = " < 1 mile from your location";
		// 		 }

		// 			return (
		// 				<div key={"key" + i} className="doctor-offices">
		// 					<ul>
		// 						<li>{item.visit_address.street + " " + item.visit_address.city + ", " + item.visit_address.state + " " + item.visit_address.zip}</li>
		// 						<li>{statement}</li>
		// 					</ul>
		// 				</div>
		// 			);
		// 	// }
		// 	// else {return null}

		// }


		//Checking for doctor images and swapping out Better Doctor's placeholder image with our own
		var doctorSrc = item.profile.image_url;
		var phoneNumber = Number(item.practices[0].phones[0].number);

		if (item.profile.image_url.slice(39) === "general_doctor_male.png") {

			doctorSrc = "http://www.bloomfieldhealth.org/assets/images/doctors/9.png";

		}

		else if (item.profile.image_url.slice(39) === "general_doctor_female.png") {

			doctorSrc = "https://img.clipartfest.com/3473fe27a237ac460a90f94f8fd47b9b_doctor-icon-doctor-icon-clipart_2100-2400.png";

		}

		return (
			//Created id here by mapping over the practices array and digging into the obj and grabbing the obj's uid
			<ScrollableAnchor id={item.uid}>
			<div key={"key" + i}  className="api-data container doctor-profile">

				<a href={"https://google.com/#q=" + item.profile.first_name + "+" + item.profile.last_name + "+" + item.profile.title} target="_blank"><h3>{item.profile.first_name + " " + item.profile.last_name + ", " + item.profile.title}</h3></a>


						{<div>
							<img className="docimg" src={doctorSrc} alt={item.profile.last_name} />

							<div className="doc-specialties-container">
							<h4>Specialties</h4>
								<div className="doc-specialties">
									{item.specialties.map(returnSpecialties)}
								</div>
							</div>

							<div className="doc-offices-container">
							<h4>Main Office</h4>
								<div className="doc-offices">
									<p>{item.practices[0].visit_address.street + " " + item.practices[0].visit_address.city + ", " + item.practices[0].visit_address.state + " " + item.practices[0].visit_address.zip}</p>
								</div>
							</div>

							<div className="dropdown">
							
								<div className="doc-offices">
									<a href={"tel:" + phoneNumber}>
									<i className="fa fa-mobile fa-2x" aria-hidden="true"><span className="span-class">Call office</span></i>

									</a>
							
								</div>
							</div>

							<div className="doc-bio-container">
							<h4>Bio</h4>
								<div className="doc-bio">
									{item.profile.bio}
								</div>
							</div>

							<div className="doc-insurances-container">
							<h4>Insurances</h4>
								<div className="insurance-options">
									{item.insurances.map(returnInsurance)}
								</div>
							</div>

						
					</div>}

			</div>
			</ScrollableAnchor>
		);

	}



	render() {

		return (

			<div className="doctors">


				{this.state.showReply && this.props.doctorData.map(this.generateDoctors)}




			</div>

		)

	}

}
module.exports = DoctorProfiles;
