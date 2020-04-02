/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

"use strict";

//This is the variable and method to grab the "name" text field. It's meant to have the field selected and ready to type by default- when someone first arrives to the page or refreshes it.
const inputName = document.getElementById("name");
inputName.focus();

//Here I declare variables that contain elements from the HTML file, create a function, event listener and if statement to control the flow of the drop down list and what options are hidden, unless a specific option is selected- in the previous list.

const tSize = document.querySelectorAll("#size option");
const tColors = document.querySelectorAll("colors");
const jsPuns = document.querySelector('option[value="js puns"]');
const heartJS = document.querySelector('option[value="heart js"]');
const punsColors = document.querySelectorAll("#jsp");
const heartsColors = document.querySelectorAll("#hjs");

//Hiding each color element from the indicated drop list using a for loop.

for (let i = 0; i < punsColors.length; i++) {
	punsColors[i].hidden = true;
	heartsColors[i].hidden = true;
}

//Logging declared variables to the console, to verify desired output.
console.log(jsPuns);
console.log(tSize);
console.log(heartJS);
console.log(punsColors);
console.log(heartsColors);
console.log(tColors);

//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.
