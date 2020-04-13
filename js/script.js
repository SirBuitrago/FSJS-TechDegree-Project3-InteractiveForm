/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.

"use strict";

//This is the variable and method to grab the "name" text field. It's meant to have the field selected and ready to type by default- when someone first arrives to the page or refreshes it.
const inputName = document.getElementById("name");
inputName.focus();

//Here I declare variables that contain elements from the HTML file, create a function, event listener and if statement to control the flow of the drop down list and what options are hidden, unless a specific option is selected- in the previous list.

const tSize = document.querySelectorAll("#size option");
const tColors = document.querySelectorAll(".colors");
const punsColors = document.querySelectorAll("#jsp");
const heartsColors = document.querySelectorAll("#hjs");
const tDesign = document.querySelector("#design");
const jsPuns = document.querySelector('option[value="js puns"]').value;
const heartJS = document.querySelector('option[value="heart js"]').value;

//Hiding each color element from the indicated drop list using a for loop within a function.
function hideColors() {
	for (let i = 0; i < 6; i++) {
		tColors[i].hidden = true;
	}
}
hideColors();
//Event listener that determines which elements to show in the "color" droplist according to what is chosen in the previous drop list.

tDesign.addEventListener("change", (e) => {
	for (let i = 0; i < 3; i++) {
		let eventValue = e.target.value;

		if (eventValue === jsPuns) {
			punsColors[0].selected = true;
			punsColors[i].hidden = false;
			heartsColors[i].hidden = true;
		} else if (eventValue === heartJS) {
			heartsColors[0].selected = true;
			heartsColors[i].hidden = false;
			punsColors[i].hidden = true;
		} else {
			hideColors();
		}
	}

	console.log("This event works!");
});

//Logging declared variables to the console, to verify desired output.-Register for Activities section
const checkboxes = document.querySelectorAll(".activities input");
const checkboxOptions = document.querySelector(".activities");

//Event listener for disabling the chekc boxes that overlap with a similar time slot conf. The for loop is to iterate over the checkboxes and determine their same type, for said disabling. I also add the sum of the checkbox options that are clicked and print them to page.
checkboxOptions.addEventListener("change", (e) => {
	let costTotal = 0;
	let clicked = e.target;
	let clickedCost = clicked.getAttribute("data-cost");
	const clickedType = clicked.getAttribute("data-day-and-time");

	for (let i = 0; i < checkboxes.length; i++) {
		let checkBoxIteration = checkboxes[i];

		const checkboxType = checkboxes[i].getAttribute("data-day-and-time");

		if (clickedType === checkboxType && clicked !== checkBoxIteration) {
			if (clicked.checked == true || false) {
				checkBoxIteration.disabled = true;
			} else {
				checkBoxIteration.disabled = false;
			}
		}
	}
	console.log(clickedCost);
	console.log("This click event is functional");
});
