

const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const errorTransactionname = document.querySelector(".error-transaction-name");
const errorTransactionAmount = document.querySelector(
	".error-transaction-amount"
);
const errorTransactionOption = document.querySelector(
	".error-transaction-option"
);
const errorMsg = document.querySelector(".error-msg");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");


let ID = 0;
let newMoneyArr
let moneyArr = []


const checkTransactionName = () => {
	if (nameInput.value.length == 0) {
		errorTransactionname.style.display = "block";
		errorTransactionname.innerHTML = "Transaction name cannot be empty!";
	} else if (nameInput.value.length > 10) {
		errorTransactionname.style.display = "block";
		errorTransactionname.innerHTML =
			"Transaction name cannot be longer then 10 charcters";
	} else {
		errorTransactionname.innerHTML = "";
	}
};

const checkTransactionAmount = () => {
	if (amountInput.value.length == 0) {
		errorTransactionAmount.style.display = "block";
		errorTransactionAmount.innerHTML = "Transaction amount cannot be empty!";
	} else if (amountInput.value.length >= 6) {
		errorTransactionAmount.style.display = "block";
		errorTransactionAmount.innerHTML =
			"Transaction amount cannot be longer then 5 digits";
	} else {
		errorTransactionAmount.innerHTML = "";
	}
};

const checkSelect = () => {
	if (categorySelect.selectedIndex == 0) {
		errorTransactionOption.style.display = "block";
		errorTransactionOption.innerHTML = "Choose one of the two options";
	} else {
		errorTransactionOption.innerHTML = "";
	}
};

const createTransaction = () => {
	checkTransactionName();
	checkTransactionAmount();
	checkSelect();

	if (
		errorTransactionAmount.innerHTML != "" ||
		errorTransactionAmount.innerHTML != "" ||
		errorTransactionOption.innerHTML != ""
	) {
		errorMsg.style.display = "block";
		errorMsg.innerHTML = "Fill out all the spaces correctly please";
	} else {
		let newTransaction = document.createElement("li");
		newTransaction.setAttribute("id", ID);
		newTransaction.classList.add("transaction");
		newTransaction.innerHTML = `<p class="transaction-name">${nameInput.value}</p>
	                                <p class="transaction-amount">${amountInput.value}zł
									<button onclick = 'transactionDelete(${ID})' class="delete">
									<i class="fas fa-times"></i></button></p>`;

										let newTransactionValue = newTransaction.childNodes[2].textContent;


		if (categorySelect.selectedIndex == 1) {
			incomeSection.appendChild(newTransaction);
			newTransaction.classList.add("income-transaction");
		} else {
			expensesSection.appendChild(newTransaction);
			newTransaction.classList.add("expense-transaction");
			let newAmount2 = parseFloat(amountInput.value);
			let newAmount = -newAmount2;

		}

		ID++;

		newBalance();
		closePanel();
	}
};

const newBalance = () => {
	if (categorySelect.selectedIndex == 1) {
		moneyArr.push(parseFloat(amountInput.value));
	} else {
		moneyArr.push(parseFloat(-amountInput.value));
	}

	let newMoneyArr = moneyArr.reduce((a, b) =>  a + b);

	availableMoney.textContent = `${newMoneyArr}$`

};


const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
	errorTransactionname.innerHTML = "";
	errorTransactionAmount.innerHTML = "";
	errorTransactionOption.innerHTML = "";
	errorMsg.innerHTML = "";
};

saveBtn.addEventListener("click", createTransaction);

addTransactionBtn.addEventListener(
	"click",
	(showPanel = () => {
		addTransactionPanel.style.display = "flex";
	})
);

cancelBtn.addEventListener(
	"click",
	(closePanel = () => {
		addTransactionPanel.style.display = "none";
		clearInputs();
	})
);

const deleteAllTransactions = () => {
	incomeSection.innerHTML = "<h3>Income</h3>";
	expensesSection.innerHTML = "<h3>Expenses</h3>";
	availableMoney.textContent = "0$";
	moneyArr = [0];
};

deleteAllBtn.addEventListener("click", deleteAllTransactions);

transactionDelete = (id) => {
	const transactionToDelete = document.getElementById(id);
	let transactionAmount = parseFloat(transactionToDelete.childNodes[2].innerText);
	
	if (transactionToDelete.classList.contains('income-transaction')) {
	  incomeSection.removeChild(transactionToDelete);
	} else {
	  expensesSection.removeChild(transactionToDelete);
	  transactionAmount *= -1; // invert the sign of the amount
	}
	
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	if (indexOfTransaction !== -1) {
	  moneyArr.splice(indexOfTransaction, 1);
	}
	
	newBalance();
  };