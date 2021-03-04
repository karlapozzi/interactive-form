//Declare variables and select DOM elements from the HTML
const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobTextField = document.getElementById('other-job-role');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');
const activities = document.getElementById('activities');
const checkboxes = document.querySelectorAll('[type=checkbox]');
const totalCostP = document.getElementById('activities-cost');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


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
//Functions to show or hide t-shirt Color options
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
//Event handler for selecting t-shirt design and hiding or showing corresponding colors
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
  }
});


//Clear activities checkboxes and cost amount by default
let costAmount = 0;
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].checked = false;
}
//Listen for selecting/de-selecting activities checkboxes and updating the total cost amount
activities.addEventListener('change', (event) => {
  let activity = event.target; 
  let activityCost = activity.getAttribute('data-cost');
  if (activity.checked) {
  costAmount += +activityCost;
  }
  if (activity.checked === false) {
    costAmount -= +activityCost;
    }
  totalCostP.innerHTML = `$${costAmount}`;
});


//Set cc payment option by default
function showCreditCard () {
  payment.value = 'credit-card';
  creditCard.style.display = '';
  payPal.style.display = 'none';
  bitcoin.style.display = 'none';
}
showCreditCard();
//Functions to show or hide payment options
function showPayment (paymentOption) {
  if (paymentOption === 'credit-card') {
    showCreditCard();
  } else if (paymentOption === 'paypal') {
    payPal.style.display = '';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'none';
  } else if (paymentOption === 'bitcoin'){
    bitcoin.style.display = '';
    payPal.style.display = 'none';
    creditCard.style.display = 'none';
  }
}
//Event handler for payment options
payment.addEventListener('change', (event) => {
  showPayment(event.target.value);
});