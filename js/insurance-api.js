


var api_key = "10ed4e3765d043de9fad1d2f6bc3153a";
var columbia_coord = "34.000,-81.035"; //Lat and Long values of Columbia, SC
var doctors = "doctors?";
var distance = 1; //Want to toggle this, distance is in miles

console.log("Hell");

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location='+columbia_coord + ',' +distance+ '&skip=0&limit=30&user_key=' + api_key;


function getInsurance (obj) {
	return obj.insurance_plan.name;
}


function displayDoctorName (obj) {
	return( obj.profile.first_name +  obj.profile.last_name + "<br/>" );
}

function displayInsurance (obj) {
	return ("<h3 class=\'doctor-heading\'>" + obj.profile.first_name + " " + obj.profile.last_name + "</h3>" + "<br/>" + "<p class=\'insurance\'>" + obj.insurances.map(getInsurance) + "</p>" + "<br />"); //this is an array of insurances the doctors accept
}

function injectInsurance (data) {
	document.getElementById('app').innerHTML += "<div>" + data.data.map(displayInsurance).join("") + "</div>"; //returns an array of insurances
	//make sure the insurances coincide with doctor profiles => always use same resource_url, skip, and limit numbers the same when doing .ajax call
}

$.ajax({
	url: resource_url,
	success: function successHandler(data) {
		injectInsurance(data);
	} 
});

