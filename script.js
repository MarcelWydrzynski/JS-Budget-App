const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");

const errorMsg = document.querySelector(".error-text");

const incomeSum = document.querySelector(".income-array");
const expensesSum = document.querySelector(".expenses-array");

let root = document.documentElement;
let ID = 0;
let incomeArr = [];
let expensesArr = [];
let moneyArr = [];



const showError = (input, min) => {
	
}


const createTransaction = () => {
	if (errorMsg.textContent != "") {
		console.log("heelo");
	} else {
		let newTransaction = document.createElement("li");
		newTransaction.classList.add("transaction");
		newTransaction.innerHTML = `<p class="transaction-name">${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}zł<button class="delete"><i
				class="fas fa-times"></i></button></p>`;

		let newTransactionValue = newTransaction.childNodes[2].textContent;

		if (categorySelect.selectedIndex == 1) {
			incomeSection.appendChild(newTransaction);
			incomeArr.push(newTransactionValue);
		} else {
			expensesSection.appendChild(newTransaction);
			expensesArr.push(newTransactionValue);
		}
		console.log(incomeArr);
		console.log(expensesArr);
		closePanel();
	}
};


const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
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
	incomeSection.innerHTML = "<h3>Przychód:</h3>";
	expensesSection.innerHTML = "<h3>Wydatki:</h3>";
	availableMoney.textContent = "0zł";
	moneyArr = [0];
};

deleteAllBtn.addEventListener("click", deleteAllTransactions);

console.log(errorMsg.textContent);

// amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense');
// moneyArr.push(parseFloat(amountInput.value));
// countMoney(moneyArr)
// closePanel();
// ID++;
// clearInputs();

// const countMoney = money => {
//     const newMoney = money.reduce((a, b) => a + b);
//     availableMoney.textContent = `${newMoney}zł`;
// }

// const deleteTransatcion = id => {
//     const transactionToDelete = document.getElementById(id);
//     const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
//     const indexOfTransaction = moneyArr.indexOf(transactionAmount);

//     moneyArr.splice(indexOfTransaction, 1)

//     transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete)
//     countMoney(moneyArr)
// }

// const deleteAllTransactions = () => {
//     incomeSection.innerHTML = '<h3>Przychód:</h3>';
//     expensesSection.innerHTML = '<h3>Wydatki:</h3>';
//     availableMoney.textContent = '0zł'
//     moneyArr = [0];
// }
