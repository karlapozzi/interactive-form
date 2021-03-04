//Declare variables and select DOM elements from the HTML
const nameField = document.getElementById('name');
const emailAddress = document.getElementById('email');
const jobRole = document.getElementById('title');
const jobTextField = document.getElementById('other-job-role');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');
const activities = document.getElementById('activities');
const checkboxes = document.querySelectorAll('[type=checkbox]');
const totalCostP = document.getElementById('activities-cost');
const paymentType = document.getElementById('payment');
const ccPayment = document.getElementById('credit-card');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNumber = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const form = document.getElementsByTagName('form')[0];


//Clear and focus on Name by default 
nameField.value = '';
nameField.focus();
//Clear email field
emailAddress.value = '';


//Clear Job Role and "Other" job text input
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


//Set cc payment option and clear cc fields by default
function showCreditCard () {
  paymentType.value = 'credit-card';
  ccPayment.style.display = '';
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
  cardNumber.value = '';
  zipCode.value = '';
  cvvNumber.value = '';
}
showCreditCard();
//Functions to show or hide payment options
function showPayment (paymentOption) {
  if (paymentOption === 'credit-card') {
    showCreditCard();
  } else if (paymentOption === 'paypal') {
    paypal.style.display = '';
    bitcoin.style.display = 'none';
    ccPayment.style.display = 'none';
  } else if (paymentOption === 'bitcoin'){
    bitcoin.style.display = '';
    paypal.style.display = 'none';
    ccPayment.style.display = 'none';
  }
}
//Event handler for payment options
paymentType.addEventListener('change', (event) => {
  showPayment(event.target.value);
});


//Form validation helpers
function isNameValid () {
  let name = nameField.value; 
  let regex = /\w+/;
  return regex.test(name);
}
function isEmailValid () {
  let email = emailAddress.value; 
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //Credit to https://emailregex.com/ for the regex
  return regex.test(email);
}
function isActivitySelected () {
  let selectedItems = 0;
  for (let i=0; i < checkboxes.length; i++){
    if (checkboxes[i].checked) {
      selectedItems += 1;
    }
  }
  return selectedItems;
}
function isCardValid () {
  if (paymentType.value === 'credit-card') {
  let card = cardNumber.value; 
  let cardRegex = /^(\d{13,16})$/;
  let zip = zipCode.value; 
  let zipRegex = /^(\d{5})$/;
  let cvv = cvvNumber.value; 
  let cvvRegex = /^(\d{3})$/;
    if (cardRegex.test(card) && zipRegex.test(zip) && cvvRegex.test(cvv)) {
      return true; 
    } else {
      return false;
    }
  } else {
    return true;
  }
}

//Event handler for form validation and submission
form.addEventListener('submit', (event) => {
  if (isNameValid() === false) {
    event.preventDefault();
    console.log(`Name cannot be blank`);
  }
  if (isEmailValid() === false) {
    event.preventDefault();
    console.log(`Please enter a valid email`);
  }
  if (isActivitySelected() === 0) {
    event.preventDefault();
    console.log(`Please select at least one actiivity`);
  }
  if (isCardValid() === false) {
      event.preventDefault();
      console.log(`Review cc details`);
    }
  if (isNameValid() && isEmailValid() && isActivitySelected() && isCardValid()) {
    event.preventDefault();
    console.log(`Submitted`);
  }
});
