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
  
  