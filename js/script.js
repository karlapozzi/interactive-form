//Declare variables and select DOM elements from the HTML
const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobTextField = document.getElementById('other-job-role');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');


//Clear and focus on Name field by default 
nameField.value = '';
nameField.focus();

//Clear Job Role and "Other" job text input by default
jobRole.value = jobRole.firstElementChild.value;
jobTextField.value = '';
//Hide the Job Role text field unless the Other job option is selected
jobTextField.style.display = 'none';
jobRole.addEventListener ('change', (event) => {
  if (event.target.value === 'other') {
    jobTextField.style.display = '';
  } else {
    jobTextField.style.display = 'none';
  }
});

//Clear and disable Color menu by default
shirtColor.value = shirtColor.firstElementChild.value;
shirtColor.disabled = true;
//Clear the shirt Design dropdown by default
shirtDesign.value = shirtDesign.firstElementChild.value;
//Show t-shirt Color options based on Design selection 
shirtDesign.addEventListener('change', (event) => {
  if (event.target.value === 'js puns') {
    shirtColor.disabled = false;
    for (let i = 0; i < heartColors.length; i++) {
      heartColors[i].style.display = 'none';
    }
    for (let i = 0; i < jsPunColors.length; i++) {
      jsPunColors[i].style.display = '';
    }
  } else if (event.target.value === 'heart js') {
    shirtColor.disabled = false; 
    for (let i = 0; i < jsPunColors.length; i++) {
      jsPunColors[i].style.display = 'none';
    }
    for (let i = 0; i < heartColors.length; i++) {
      heartColors[i].style.display = '';
    }
  } else {
    shirtColor.disabled = true;
  }
});