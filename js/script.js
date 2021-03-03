//Declare variables and select DOM elements from the HTML
const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobTextField = document.getElementById('other-job-role');
const shritColor = document.getElementById('color');

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

//Disable color menu by default
