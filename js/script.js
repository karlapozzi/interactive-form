//Declare variables and select DOM elements from the HTML
const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobTextField = document.getElementById('other-job-role');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');
const activities = document.getElementById('activities');
const totalCostP = document.getElementById('activities-cost');


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
shirtColor.disabled = true;
function resetColor () {
  shirtColor.value = shirtColor.firstElementChild.value;
}
resetColor();
//Clear the shirt Design dropdown by default
shirtDesign.value = shirtDesign.firstElementChild.value;
//Show t-shirt Color options based on Design selection
function hideColors (colors) {
  for (let i = 0; i < colors.length; i++) {
    colors[i].style.display = 'none';
  }
}
function showColors (colors) {
  for (let i = 0; i < colors.length; i++) {
    colors[i].style.display = '';
  }
}

shirtDesign.addEventListener('change', (event) => {
  if (event.target.value === 'js puns') {
    shirtColor.disabled = false;
    showColors(jsPunColors);
    hideColors(heartColors);
    resetColor();
  } else if (event.target.value === 'heart js') {
    shirtColor.disabled = false; 
    showColors(heartColors);
    hideColors(jsPunColors);
    resetColor();
  } else {
    shirtColor.disabled = true;
    resetColor();
  }
});

//Listen for selected checkboxes
let costAmount = 0;
activities.addEventListener('change', (event) => {
  let activity = event.target; 
  let activityCost = activity.getAttribute('data-cost');
  if (activity.checked) {
  costAmount += +activityCost;
  }
  if (activity.checked === false) {
    costAmount -= +activityCost;
    }
  console.log(costAmount);
});