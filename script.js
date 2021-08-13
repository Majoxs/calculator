'use strict';

let start = document.getElementById('start'),
   btnPlus = document.getElementsByTagName('button'),
   incomePlus = btnPlus[0],
   expensesPlus = btnPlus[1],
   depositCheck = document.querySelector('#deposit-check'),
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   salaryAmount = document.querySelector('input.salary-amount'),
   incomeTitle = document.querySelector('input.income-title'),
   incomeItems = document.querySelectorAll('.income-items'),
   expensesTitle = document.querySelector('input.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   additionalExpensesItem = document.querySelector('input.additional_expenses-item'),
   targetAmount = document.querySelector('input.target-amount'),
   periodSelect = document.querySelector('input.period-select'),
   incomeItem = document.querySelectorAll('.income-items');

const appData = {
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   expensesMonth: 0,
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   start: function () {
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
   },
   showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();

      periodSelect.addEventListener('input', function () {
         incomePeriodValue.value = appData.calcPeriod();
      });
   },
   addIncomeBlock: function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   },
   addExpensesBlock: function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   },
   getExpenses: function () {
      expensesItems.forEach(function (item) {
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = +cashExpenses;
         }
      });
   },
   getIncome: function () {
      incomeItems.forEach(function (item) {
         let itemIncome = item.querySelector('.income-title').value;
         let cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = +cashIncome;
         }
      });
   },
   getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
         item = item.trim();
         if (item !== '') {
            appData.addExpenses.push(item);
         }
      });
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(function (item) {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: function () {

      for (let key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return targetAmount.value / appData.budgetMonth;
   },
   getStatusIncome: function () {
      if (appData.budgetDay >= 1200) {
         return ('У Вас высокий уровень дохода');
      } else if (appData.budgetDay >= 600) {
         return ('У Вас средний уровень дохода');
      } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
         return ('К сожалению у Вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   },
   getInfoDeposit: function () {
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      if (appData.deposit) {
         appData.percentDeposit = prompt('Какой годовой процент?');
         while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || appData.percentDeposit == 0) {
            appData.percentDeposit = prompt('Какой годовой процент?');
         };
         appData.moneyDeposit = prompt('Какая сумма заложена?');
         while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null || appData.moneyDeposit == 0) {
            appData.moneyDeposit = prompt('Какая сумма заложена?');
         };
      }
   },
   calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
   }
};

start.addEventListener('click', function (event) {
   if (salaryAmount.value === '') {
      event.preventDefault();
   }
   appData.start();
});

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function () {
   let numberPeriod = document.querySelector('.period-amount');
   numberPeriod.textContent = periodSelect.value;
});