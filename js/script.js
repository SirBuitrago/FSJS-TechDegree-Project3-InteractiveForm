/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If my code is not on par with that grade, then please reject this project for resubmission.

"use strict";

//This is the variable and method to grab the "name" text field. It's meant to have the field selected and ready to type by default- when someone first arrives to the page or refreshes it.
const inputName = document.getElementById("name");
inputName.focus();

//Here I declare global variables for the "T-shirt info" section, create a function, event listener and if statement to control the flow of the drop down list and what options are hidden, unless a specific option is selected- in the previous list.

const tSize = document.querySelectorAll("#size option");
const tColors = document.querySelectorAll(".colors");
const punsColors = document.querySelectorAll("#jsp");
const heartsColors = document.querySelectorAll("#hjs");
const tDesign = document.querySelector("#design");
const jsPuns = document.querySelector('option[value="js puns"]').value;
const heartJS = document.querySelector('option[value="heart js"]').value;
const colorsJsPuns = document.querySelector("#colors-js-puns");

//Hiding each color element from the indicated drop list using a for loop within a function.
function hideColors() {
	for (let i = 0; i < 6; i++) {
		tColors[i].hidden = true;
	}
}
hideColors();
//Event listener that determines which elements to show in the "color" droplist according to what is chosen in the previous "design" drop list.

tDesign.addEventListener("change", (e) => {
	for (let i = 0; i < 3; i++) {
		let eventValue = e.target.value;

		if (eventValue === jsPuns) {
			colorsJsPuns.style.display = "block";
			punsColors[0].selected = true;
			punsColors[i].hidden = false;
			heartsColors[i].hidden = true;
		} else if (eventValue === heartJS) {
			colorsJsPuns.style.display = "block";
			heartsColors[0].selected = true;
			heartsColors[i].hidden = false;
			punsColors[i].hidden = true;
		} else {
			colorsJsPuns.style.display = "none";
			hideColors();
		}
	}

	//console.log("This event works!");
});

//Declaring global variables for the "Register for Activities" section.
let totalCost = 0;
const checkboxOptions = document.querySelector(".activities");
const checkboxesCost = Array.from(document.getElementsByClassName("data-cost"));
const checkboxes = document.querySelectorAll(".activities input");

//Event listener for disabling the check boxes within the "Register for Activities" section that overlap or conflict with a similar time slot. The for loop is to iterate over the checkboxes and determine their same type, for said disabling. I also add the sum of the checkbox options that are clicked and print them to page.
checkboxOptions.addEventListener("change", (e) => {
	let clicked = e.target.checked;
	const total = document.querySelector(".conf-total");
	const clickedCost = parseInt(e.target.getAttribute("data-cost"));
	const clickedType = e.target.getAttribute("data-day-and-time");

	if (clicked) {
		totalCost += clickedCost;
		total.innerHTML = "Total: $" + totalCost;
	} else {
		totalCost -= clickedCost;
		total.innerHTML = "Total: $" + totalCost;
	}
	if (totalCost === 0) {
		total.style.display = "none";
	} else {
		total.style.display = "block";
	}

	for (let i = 0; i < checkboxes.length; i++) {
		let checkBoxIteration = checkboxes[i];
		const dates = checkboxes[i].getAttribute("data-day-and-time");

		if (clickedType === dates && e.target !== checkBoxIteration) {
			if (clicked) {
				checkBoxIteration.disabled = true;
				checkBoxIteration.parentElement.style.color = "grey";
			} else {
				checkBoxIteration.disabled = false;
				checkBoxIteration.parentElement.style.color = "black";
			}
		}
	}

	//console.log("This click event is functional");
});

//This function checks whether or not an activity has been chosen.

function registerActivitiesCheck() {
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].type === "checkbox") {
			if (checkboxes[i].checked) {
				return true;
			}
		}
	}
	return false;
}

//Declaring global variables for the "Payment Info" section.
const paypal = document.querySelector(".paypal");
const bitcoin = document.querySelector(".bitcoin");
const creditCard = document.querySelector(".credit-card");
const paymentDropDown = document.querySelector("#payment");

//Event listener for the payment menu, so that when a user selects a specific form of payment, all other payment options are hidden.
paymentDropDown.addEventListener("change", (e) => {
	document.getElementById("payment").firstElementChild.hidden = true;
	if (e.target.value === "credit card") {
		creditCard.style.display = "block";
		paypal.style.display = "none";
		bitcoin.style.display = "none";
	} else if (e.target.value === "paypal") {
		creditCard.style.display = "none";
		paypal.style.display = "block";
		bitcoin.style.display = "none";
	} else if (e.target.value === "bitcoin") {
		creditCard.style.display = "none";
		paypal.style.display = "none";
		bitcoin.style.display = "block";
	}
});

//The following are verification functions for the distinct input fields on the form. It checks for the appropriate characters, letters or symbols associated with said field. It also displays an error message.

//Verification function for the name field.

function validName(name) {
	return /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(name);
}
function nameErrorMessage(show, element, blank) {
	if (show) {
		element.textContent =
			"Provide a valid Name please: (Uppercase or Lowercase letters)";
		element.style.color = "red";
	} else {
		element.textContent = "Looks Good!";
		element.style.color = "green";
	}
	if (blank) {
		element.textContent = "Name:";
		element.style.color = "black";
	}
}
function nameEventParameters(validator) {
	return (e) => {
		const text = e.target.value;
		const validate = validator(text);
		const showText = text !== "" && !validate;
		const toolText = e.target.previousElementSibling;
		const empty = text == "";
		nameErrorMessage(showText, toolText, empty);
	};
}

//Execute the Name validator function, in an event listener.

inputName.addEventListener("input", nameEventParameters(validName));

//Verification function for Email field, to make sure the user inputs all necessary symbols associated with an email. It also displays an error message.
const inputEmail = document.querySelector("#mail");

function validateEmail(email) {
	return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function emailErrorMessage(show, element, blank) {
	if (show) {
		element.textContent = "Provide a valid Email please";
		element.style.color = "red";
	} else {
		element.textContent = "Looks Good!";
		element.style.color = "green";
	}
	if (blank) {
		element.textContent = "Email:";
		element.style.color = "black";
	}
}
function emailEventParameters(validator) {
	return (e) => {
		const text = e.target.value;
		const validate = validator(text);
		const showText = text !== "" && !validate;
		const toolText = e.target.previousElementSibling;
		const empty = text == "";
		emailErrorMessage(showText, toolText, empty);
	};
}

//Execute the Email validator function, in an event listener.
inputEmail.addEventListener("input", emailEventParameters(validateEmail));

//Verification function for the Credit Card field. To check whether or not the user inputs a valid credit card number- in terms of length and sequence. It also displays an error message.

const inputCredit = document.querySelector("#cc-num");

function validateCreditCard(cardNum) {
	return /^[0-9]{13,16}$/.test(cardNum);
}
function creditErrorMessage(show, element, blank) {
	if (show) {
		element.textContent = "Credit Card Number needs to be: 13 to 16 digits";
		element.style.color = "red";
		element.style.fontColor = "red";
		element.style.fontSize = "85%";
	} else {
		element.textContent = "Looks Good!";
		element.style.fontSize = "100%";
		element.style.color = "green";
	}
	if (blank) {
		element.textContent = "Please enter a Credit Card Number.";
		element.style.fontSize = "100%";
		element.style.color = "black";
	}
}
function creditEventParameters(validator) {
	return (e) => {
		const text = e.target.value;
		const validate = validator(text);
		const showText = text !== "" && !validate;
		const toolText = e.target.previousElementSibling;
		const empty = text == "";
		creditErrorMessage(showText, toolText, empty);
	};
}

//Executing credit card validator, in an event listener.
inputCredit.addEventListener(
	"input",
	creditEventParameters(validateCreditCard)
);

//Zipcode verification function. It also displays an error message.

const inputZipCode = document.querySelector("#zip");

function validateZipCode(zipcode) {
	return /^\d{5}$/.test(zipcode);
}
function zipcodeErrorMessage(show, element, blank) {
	if (show) {
		element.textContent = "Valid Zip Codes Only!";
		element.style.fontColor = "red";
		element.style.fontSize = "80%";
		element.style.color = "red";
	} else {
		element.textContent = "Looks Good!";
		element.style.fontSize = "100%";
		element.style.borderColor = "black";
		element.style.color = "green";
	}
	if (blank) {
		element.textContent = "Please enter a Zip Code.";
		element.style.fontSize = "100%";
		element.style.color = "black";
	}
}
function zipcodeEventParameters(validator) {
	return (e) => {
		const text = e.target.value;
		const validate = validator(text);
		const showText = text !== "" && !validate;
		const toolText = e.target.previousElementSibling;
		const empty = text == "";
		zipcodeErrorMessage(showText, toolText, empty);
	};
}

//Executing zip code validator, in an event listener.
inputZipCode.addEventListener("input", zipcodeEventParameters(validateZipCode));

//Verification function for the security code field in credit cards. It also displays an error message.

const inputCVV = document.querySelector("#cvv");

function validateCVV(cvv) {
	return /^\d{3}$/.test(cvv);
}
function cvvErrorMessage(show, element, blank) {
	if (show) {
		element.style.borderColor = "red";
		element.textContent =
			"Must be a valid Security Code: (3 digits located in front or back of credit card)";
		element.style.fontColor = "red";
		element.style.fontSize = "80%";
		element.style.color = "red";
	} else {
		element.textContent = "Looks Good!";
		element.style.fontSize = "100%";
		element.style.borderColor = "black";
		element.style.color = "green";
	}
	if (blank) {
		element.textContent = "CVV:";
		element.style.fontSize = "100%";
		element.style.color = "black";
	}
}
function cvvEventParameters(validator) {
	return (e) => {
		const text = e.target.value;
		const validate = validator(text);
		const showText = text !== "" && !validate;
		const toolText = e.target.previousElementSibling;
		const empty = text == "";
		cvvErrorMessage(showText, toolText, empty);
	};
}

//Executing security code validator, in an event listener.

inputCVV.addEventListener("input", cvvEventParameters(validateCVV));

//This is an event listener for the Register Button, to verify that the user has sucessfully input the necessary information in all the form fields. If not, error messages are displayed by each field, in accordance to what is missing or input the wrong way.

const alertMessage = document.createElement("span");
const inputRegisterButton = document.querySelector("form");

inputRegisterButton.addEventListener("submit", (e) => {
	if (!validateName(inputName.value)) {
		inputName.style.borderColor = "red";
		inputName.previousElementSibling.textContent = "A valid Name is needed.";
		inputName.previousElementSibling.style.color = "red";
		e.preventDefault();
	}
	if (!validateEmail(inputEmail.value)) {
		inputEmail.style.borderColor = "red";
		inputEmail.previousElementSibling.textContent =
			"A vaild email address is needed";
		inputEmail.previousElementSibling.style.color = "red";
		e.preventDefault();
	}
	if (!registerActivitiesCheck()) {
		const chinCheck = checkboxOptions.firstElementChild;
		alertMessage.innerHTML = " [Please choose an activity]";
		alertMessage.style.fontSize = "80%";
		alertMessage.style.color = "red";
		chinCheck.appendChild(alertMessage);
		chinCheck.style.color = "red";
	}
	if (
		!validateCreditCard(inputCredit.value) &&
		paymentDropDown.value === "credit card"
	) {
		inputCredit.style.borderColor = "red";
		inputCredit.previousElementSibling.style.color = "red";
		e.preventDefault();
	}
	if (
		!validateZipCode(inputZipCode.value) &&
		paymentDropDown.value === "credit card"
	) {
		inputZipCode.style.borderColor = "red";
		inputZipCode.previousElementSibling.style.color = "red";
		e.preventDefault();
	}
	if (!validateCVV(inputCVV.value) && paymentDropDown.value === "credit card") {
		inputCVV.style.borderColor = "red";
		inputCVV.previousElementSibling.style.color = "red";
		e.preventDefault();
	}
});
