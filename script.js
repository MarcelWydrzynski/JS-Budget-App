// main page containers
const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

//User inputs and errors
const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const errorTransactionName = document.querySelector(".error-transaction-name");
const errorTransactionAmount = document.querySelector(".error-transaction-amount");
const errorTransactionOption = document.querySelector(".error-transaction-option");
const errorMsg = document.querySelector(".error-msg");

//Options container 
const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");

let ID = 0;
let moneyArr = [];

//functions to check user inputs
const checkTransactionName = () => {
	if (nameInput.value.length == 0) {
		errorTransactionName.style.visibility = "visible";
		errorTransactionName.innerHTML = "Transaction name cannot be empty!";
	} else if (nameInput.value.length > 20) {
		errorTransactionName.style.visibility = "visible";
		errorTransactionName.innerHTML =
			"Transaction name cannot be longer then 20 charcters";
	} else {
		errorTransactionName.style.visibility = "hidden";
	}
};

const checkTransactionAmount = () => {
	if (amountInput.value.length == 0) {
		errorTransactionAmount.style.visibility = "visible";
		errorTransactionAmount.innerHTML = "Transaction amount cannot be empty!";
	} else if (amountInput.value.length > 6) {
		errorTransactionAmount.style.visibility = "visible";
		errorTransactionAmount.innerHTML =
			"Transaction amount cannot be longer then 6 digits";
	} else {
		errorTransactionAmount.style.visibility = "hidden";
	}
};

const checkSelect = () => {
	if (categorySelect.selectedIndex == 0) {
		errorTransactionOption.style.visibility = "visible";
		errorTransactionOption.textContent = "Choose one of the two options";
	} else {
		errorTransactionOption.style.visibility = "hidden";
	}
};

//main funtion if user inputs are ok creates a new transaction and adds it to right conatiner

const createTransaction = () => {
	checkTransactionName();
	checkTransactionAmount();
	checkSelect();

	if (
		errorTransactionName.style.visibility === "visible" ||
		errorTransactionAmount.style.visibility === "visible" ||
		errorTransactionOption.style.visibility === "visible"
	) {
		errorMsg.style.visibility = "visible";
		errorMsg.innerHTML = "Fill out all the spaces correctly please";
	} else {
		let newTransaction = document.createElement("li");
		newTransaction.setAttribute("id", ID);
		newTransaction.classList.add("transaction", "enlarge");
		newTransaction.innerHTML = `<p class="transaction-name">${nameInput.value}</p>
	                                <p class="transaction-amount">${amountInput.value}$
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


//A function that checks if the transaction is a income or expense and then adds it or subtracts it from the moneyArr
const newBalance = () => {
	if (categorySelect.selectedIndex == 1) {
		moneyArr.push(parseFloat(amountInput.value));
	} else {
		moneyArr.push(parseFloat(-amountInput.value));
	}

	let newMoneyArr = moneyArr.reduce((a, b) => a + b);

	availableMoney.textContent = `Available Funds: ${newMoneyArr}$`;
};

//function that clears all inputs and error msg
const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
	errorTransactionName.style.visibility = "hidden";
	errorTransactionAmount.style.visibility = "hidden";
	errorTransactionOption.style.visibility = "hidden";
	errorMsg.style.visibility = "hidden";
};

//Function that selects a transations and deletes that specific one, also removes the transaction amount from the moneyArr
transactionDelete = (id) => {
	const transactionToDelete = document.getElementById(id);
	transactionToDelete.classList.add("shrink");
	let transactionAmount = parseFloat(
		transactionToDelete.childNodes[2].innerText
	);

	setTimeout(() => {
		if (transactionToDelete.classList.contains("income-transaction")) {
			incomeSection.removeChild(transactionToDelete);
		} else {
			expensesSection.removeChild(transactionToDelete);
			transactionAmount *= -1;
		}

		const indexOfTransaction = moneyArr.indexOf(transactionAmount);
		if (indexOfTransaction !== -1) {
			moneyArr.splice(indexOfTransaction, 1);
		}

		newBalance();
	}, 1000);
};

// Event listners
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
	incomeSection.innerHTML = "";
	expensesSection.innerHTML = "";
	availableMoney.textContent = "Available Funds: 0$";
	moneyArr = [0];
};

deleteAllBtn.addEventListener("click", deleteAllTransactions);
