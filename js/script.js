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

//Event listener for disabling the check boxes within the "Register for Activities" section that overlap or conflict with a similar time slot. The for loop is to iterate over the checkboxes and determine their same type, for said disabling. I also add the sum of the checkbox options that are clicked and print them to page.
checkboxOptions.addEventListener("change", (e) => {
	let clicked = e.target.checked;
	const total = document.querySelector(".conf-total");
	const clickedCost = parseInt(e.target.getAttribute("data-cost"));
	const clickedType = e.target.getAttribute("data-day-and-time");
	const checkboxes = document.querySelectorAll(".activities input");

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

//Declaring global variables for the "Payment Info" section.
const paypal = document.querySelector(".paypal");
const bitcoin = document.querySelector(".bitcoin");
const creditCard = document.querySelector(".credit-card");
const paymentDropDown = document.querySelector("#payment");

//Event listener for the payment menu, so that when a user selects a payment option, all other payment options are hidden.
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

//The following are verification functions for the input fields on the form.

//Verification for the name field.

function validName(name) {
	return /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(name);
}
function nameErrorMessage(show, element, blank) {
	if (show) {
		element.nextElementSibling.style.borderColor = "red";
		element.textContent =
			"Please provide a valid Name (Upper and Lowercase only, hyphens accepted)";
		element.style.color = "red";
	} else {
		element.nextElementSibling.style.borderColor = "rgb(111, 157, 220)";
		element.textContent = "Name:";
		element.style.color = "green";
	}
	if (blank) {
		element.style.color = "black";
	}
}
function createListenerName(validator) {
	return (e) => {
		const text = e.target.value;
		const valid = validator(text);
		const showTip = text !== "" && !valid;
		const tooltip = e.target.previousElementSibling;
		const blank = text == "";
		nameErrorMessage(showTip, tooltip, blank);
	};
}

//execute the Name validator
inputName.addEventListener("input", createListenerName(validName));
