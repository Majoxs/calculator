'use strict';

const start = document.getElementById('start'),
   incomePlus = document.getElementsByClassName('btn_plus')[0],
   expensesPlus = document.getElementsByClassName('btn_plus')[1],
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
   expensesTitle = document.querySelector('input.expenses-title'),
   additionalExpensesItem = document.querySelector('input.additional_expenses-item'),
   targetAmount = document.querySelector('input.target-amount'),
   periodSelect = document.querySelector('input.period-select'),
   numberPeriod = document.querySelector('.period-amount'),
   cancel = document.getElementById('cancel');


let incomeItems = document.querySelectorAll('.income-items'),
   expensesItems = document.querySelectorAll('.expenses-items');


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

      if (salaryAmount.value.trim() === '') {
         start.setAttribute('disabled', 'true');
         return;
      }

      let allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach(function (item) {
         item.setAttribute('disabled', 'disabled');
      });
      incomePlus.setAttribute('disabled', 'disabled');
      expensesPlus.setAttribute('disabled', 'disabled');
      start.style.display = 'none';
      cancel.style.display = 'block';


      this.budget = +salaryAmount.value;


      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.getInfoDeposit();
      this.getStatusIncome();

      this.showResult();

   },
   showResult: function () {
      const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();


      periodSelect.addEventListener('input', function () {
         incomePeriodValue.value = _this.calcPeriod();
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
            this.expenses[itemExpenses] = +cashExpenses;
         }
      }, this);
   },
   getIncome: function () {
      incomeItems.forEach(function (item) {
         let itemIncome = item.querySelector('.income-title').value;
         let cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
         }
      }, this);

      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   },
   getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      }, this);
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(function (item) {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      }, this);
   },
   getExpensesMonth: function () {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return targetAmount.value / this.budgetMonth;
   },
   getStatusIncome: function () {
      if (this.budgetDay >= 1200) {
         return ('У Вас высокий уровень дохода');
      } else if (this.budgetDay >= 600) {
         return ('У Вас средний уровень дохода');
      } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
         return ('К сожалению у Вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   },
   getInfoDeposit: function () {
      if (this.deposit) {
         this.percentDeposit = prompt('Какой годовой процент?');
         while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null || this.percentDeposit == 0) {
            this.percentDeposit = prompt('Какой годовой процент?');
         };
         this.moneyDeposit = prompt('Какая сумма заложена?');
         while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null || this.moneyDeposit == 0) {
            this.moneyDeposit = prompt('Какая сумма заложена?');
         };
      }
   },
   calcPeriod: function () {
      return this.budgetMonth * periodSelect.value;
   },
   check: function () {
      if (salaryAmount.value !== '') {
         start.removeAttribute('disabled');
      }
   },
   reset: function () {

      let inputTextData = document.querySelectorAll('.data input[type = text]');
      let resultInputAll = document.querySelectorAll('.result input[type = text]');

      inputTextData.forEach(function (elem) {
         elem.value = '';
         elem.removeAttribute('disabled');
         periodSelect.value = '0';
         numberPeriod.innerHTML = periodSelect.value;
      });

      resultInputAll.forEach(function (elem) {
         elem.value = '';
      });

      for (let i = 1; i < incomeItems.length; i++) {
         incomeItems[i].parentNode.removeChild(incomeItems[i]);
         incomePlus.style.display = 'block';
      }

      for (let i = 1; i < expensesItems.length; i++) {
         expensesItems[i].parentNode.removeChild(expensesItems[i]);
         expensesPlus.style.display = 'block';
      }

      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;

      cancel.style.display = 'none';
      start.style.display = 'block';

      incomePlus.removeAttribute('disabled');
      expensesPlus.removeAttribute('disabled');

      depositCheck.checked = false;
   }
};

start.addEventListener('click', appData.start.bind(appData));


incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

salaryAmount.addEventListener('keyup', appData.check);

cancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('input', function () {
   numberPeriod.textContent = periodSelect.value;
});
