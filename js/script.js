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
  totalCostP.innerHTML = `Total: $${costAmount}`;
});

//Make focus more clear when selecting/de-selecting activities checkboxes
for (let i = 0; i < checkboxes.length; i++) {
checkboxes[i].addEventListener('focus', (event) => {
  let label = event.target.parentElement;
  label.className = 'focus';
});
checkboxes[i].addEventListener('blur', () => {
  let label = document.querySelector('.focus');
  label.className = '';
});
}


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
function isCardNumValid () {
  let card = cardNumber.value; 
  let cardRegex = /^(\d{13,16})$/;
  return cardRegex.test(card);
}
function isZipValid () {
  let zip = zipCode.value; 
  let zipRegex = /^(\d{5})$/;
  return zipRegex.test(zip);
}
function isCVV () {
  let cvv = cvvNumber.value; 
  let cvvRegex = /^(\d{3})$/;
  return cvvRegex.test(cvv);
}

//Functions to add/remove valid and not-valid classes and hints
function notValid (element) {
  element.classList.add = 'not-valid';
  element.classList.remove = 'valid';
  element.lastElementChild.style.display = 'flex';
}
function showValid (element) {
  element.classList.add = 'valid';
  element.lastElementChild.style.display = 'none';
}

//Real time validation and error messages
nameField.addEventListener('keyup', () => {
 if (isNameValid() === false) {
   notValid(nameField.parentElement);
 } else {
   showValid(nameField.parentElement);
 }
});

emailAddress.addEventListener('keyup', () => {
  if (isEmailValid() === false) {
    notValid(emailAddress.parentElement);
  } else {
    showValid(emailAddress.parentElement);
  }
 });

 if (paymentType.value === 'credit-card') {
  cardNumber.addEventListener('keyup', () => {
    if (isCardNumValid() === false) {
      notValid(cardNumber.parentElement);
    } else {
      showValid(cardNumber.parentElement);
    }
  });
  zipCode.addEventListener('keyup', () => {
    if (isZipValid() === false) {
      notValid(zipCode.parentElement);
    } else {
      showValid(zipCode.parentElement);
    }
  });
  cvvNumber.addEventListener('keyup', () => {
    if (isCVV() === false) {
      notValid(cvvNumber.parentElement);
    } else {
      showValid(cvvNumber.parentElement);
    }
  });
 }

//  function realTimeErrors (element) {
//    element.addEventListener('keyup', () => {
//      if
//    })
//  }

//Event handler to prevent form submission for invalid fields
form.addEventListener('submit', (event) => {
  if (isNameValid() === false) {
    event.preventDefault();
  } 
  if (isEmailValid() === false) {
    event.preventDefault();
  }

  if (isActivitySelected() === 0) {
    event.preventDefault();
    notValid(activities);
  } else {
    showValid(activities);
  }
//Only prevent form submission for cc fields IF payment option is cc
  if (paymentType.value === 'credit-card') {
    if (isCardNumValid() === false) {
        event.preventDefault();
      }
    if (isZipValid() === false) {
      event.preventDefault();
    }
    if (isCVV() === false) {
      event.preventDefault();
    }
  }
});
