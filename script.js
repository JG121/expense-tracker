const shareButton = document.querySelector(".share-button");

shareButton.addEventListener("click", function() {
  const uniqueId = getUniqueId();
  const url = `https://jg121.github.io/expense-tracker/?uniqueId=${uniqueId}&edit=true`;

  window.open(url, "_blank");
});
















function getUniqueId() {
  const uniqueId = localStorage.getItem("uniqueId");

  if (uniqueId === null) {
    uniqueId = Math.random().toString(36).substring(7);
    localStorage.setItem("uniqueId", uniqueId);
  }

  return uniqueId;
}



const uniqueId = Math.random().toString(36).substring(7);

document.getElementById("expenses").setAttribute("data-unique-id", uniqueId);


function generateLink() {
  const uniqueId = Math.random().toString(36).substring(7);

  return `https://jg121.github.io/expense-tracker/?uniqueId=${uniqueId}`;
}





function generateQRCode(uniqueLink) {
  // Generate the QR code.
  const qrcode = new QRCode("unique-link", {
    width: 200,
    height: 200,
  });

  // Display the QR code.
  document.getElementById("qrcode").appendChild(qrcode.canvas);
}

// Generate the QR code for the current device.
const uniqueLink = generateUniqueLink();
generateQRCode(uniqueLink);

// Check if the user is on a different device.
const currentDeviceId = localStorage.getItem("deviceId");
const uniqueLinkDeviceId = sessionStorage.getItem("deviceId");

if (currentDeviceId !== uniqueLinkDeviceId) {
  // The user is on a different device.
  // Generate a new unique link.
  const newUniqueLink = generateUniqueLink();

  // Generate the QR code for the new device.
  generateQRCode(newUniqueLink);
}
const QRCode = require("qrcode");
generateQRCode(uniqueLink);














// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsYp_nL3wQ2IjNbXvrg-vO1HtOp4keoys",
  authDomain: "https://jg121.github.io/expense-tracker/",
  projectId: "official-expense-tracker",
  storageBucket: "official-expense-tracker.appspot.com",
  messagingSenderId: "763300574640",
  appId: "1:763300574640:web:726ad52675760e7aab9275",
  measurementId: "G-BNZQGHXBKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  // Set up our register function
function register () {
 // Get all our input fields
 email = document.getElementById('email').value 
}






// Function to export expenses as a JSON file
function exportExpenses() {
  // Get selected expenses for export
  const checkboxes = document.querySelectorAll('.expense-list-item input[type="checkbox"]');
  const selectedExpenses = [];
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const expenseId = checkbox.getAttribute('data-expense-id');
      const selectedExpense = expenses.find(expense => expense.id === expenseId);
      if (selectedExpense) {
        selectedExpenses.push(selectedExpense);
      }
    }
  });

  if (selectedExpenses.length > 0) {
    // Convert selected expenses array to JSON string
    const expensesJSON = JSON.stringify(selectedExpenses);

    // Create a Blob object with the JSON string
    const blob = new Blob([expensesJSON], { type: 'application/json' });

    // Generate a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element for downloading the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.json';
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  } else {
    alert('Please select at least one expense to export.');
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $("#name").text(profile.getName());
  $("#email").text(profile.getEmail());
  $("#image").attr('src', profile.getImageUrl());
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");

  // Redirect to homepage after successful sign-in
  window.location.href = "homepage.html";
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out successfully");
    $(".g-signin2").css("display", "block");
    $(".data").css("display", "none");
  });
}




function getTotalExpenseAmount() {
  let totalExpense = 0;
  const expenseItems = document.querySelectorAll(".expense-list li:not([style*='none'])");

  for (const expenseItem of expenseItems) {
    const expenseAmount = expenseItem.querySelector(".expense-amount").innerHTML;
    const expenseAmountNumber = Number(expenseAmount);
    totalExpense += expenseAmountNumber;
  }

  return totalExpense;
}

// Update the total expense amount in the DOM
function updateTotalExpenseAmount() {
  const totalExpense = getTotalExpenseAmount();
  const totalAmountElement = document.querySelector("#total-amount");
  const currencySelectElement = document.querySelector("#currency-select");
  const currency = currencySelectElement.value;
  totalAmountElement.innerHTML = `${totalExpense} ${currency}`;
}

// Event listener for the submit button
document.querySelector(".expense-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the expense amount
  const expenseAmount = document.querySelector("#expense-input").value;
  const expenseCategory = document.querySelector("#expense-category").value;
  const expenseDate = document.querySelector("#expense-date").value;

  // Create a new expense item
  const expenseItem = document.createElement("li");
  expenseItem.innerHTML = `
    <span class="expense-category">${expenseCategory}</span>
    <span class="expense-amount">${expenseAmount}</span>
    <span class="expense-date">${expenseDate}</span>
  `;

  // Add the expense item to the expense list
  const expenseList = document.querySelector(".expense-list");
  expenseList.appendChild(expenseItem);

  // Update the total expense amount
  updateTotalExpenseAmount();
});

// Event listener for the increase button
document.querySelector("#increase-button").addEventListener("click", () => {
  let expenseAmount = document.querySelector("#expense-input").value;
  expenseAmount++;
  document.querySelector("#expense-input").value = expenseAmount;
});

// Event listener for the decrease button
document.querySelector("#decrease-button").addEventListener("click", () => {
  let expenseAmount = document.querySelector("#expense-input").value;
  expenseAmount--;
  document.querySelector("#expense-input").value = expenseAmount;
});

// Function to filter expenses based on month and year
function filterExpenses() {
  const filterMonth = document.querySelector("#filter-month").value.toLowerCase();
  const filterYear = document.querySelector("#filter-year").value.toLowerCase();
  const expenseItems = document.querySelectorAll(".expense-list li");

  for (const expenseItem of expenseItems) {
    const expenseDate = expenseItem.querySelector(".expense-date").innerHTML.toLowerCase();
    if (filterMonth !== "all" && filterYear !== "all") {
      if (expenseDate.includes(filterMonth) && expenseDate.includes(filterYear)) {
        expenseItem.style.display = "block";
      } else {
        expenseItem.style.display = "none";
      }
    } else {
      expenseItem.style.display = "block";
    }
  }

  updateTotalExpenseAmount();
}

// Event listener for the filter form
document.querySelector(".filter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  filterExpenses();
});

// Initialize the script
updateTotalExpenseAmount();
filterExpenses();

