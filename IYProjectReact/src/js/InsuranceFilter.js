import React from 'react';


class InsuranceFilter extends React.Component {

	generateInsurance (item) {
		console.log(item);

		function getDoctorInsurance (obj) {
			return (obj.insurance_plan.name + ", ");
		}

		return (
			<div>
				
				<p>{item.profile.first_name + " insurances: "}</p>

				<p>{item.insurances.map(getDoctorInsurance)}</p>
			</div>
		);
		
		}

	constructor () {
		super ();

		this.state = {
			insurance_info: undefined, //Need this to be resultArr
			resultArrInsurance: undefined
		
		}

	}

	render () {
		return (
			<div>
				"Something"
				<div className="insurance-options">
					Insurance Options
					<div className="insurance-data">{this.props.insuranceData.map(this.generateInsurance)}</div>
				</div>
			</div>
		)
	}
}


module.exports = InsuranceFilter;
