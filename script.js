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
   cancel = document.getElementById('cancel'),
   depositBank = document.querySelector('.deposit-bank'),
   depositAmount = document.querySelector('.deposit-amount'),
   depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
   expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
   constructor() {
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
   }

   start() {
      console.log(depositPercent.value);
      if (salaryAmount.value.trim() === '') {
         start.setAttribute('disabled', 'true');
         return;
      }

      let allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach(function (item) {
         item.setAttribute('disabled', 'true');
      });
      incomePlus.setAttribute('disabled', 'true');
      expensesPlus.setAttribute('disabled', 'true');
      start.style.display = 'none';
      cancel.style.display = 'block';

      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.getBudget();
      this.getStatusIncome();
      this.showResult();
   }

   check() {
      if (salaryAmount.value !== '') {
         start.removeAttribute('disabled');
      }
   }

   showResult() {
      const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();

      periodSelect.addEventListener('input', function () {
         incomePeriodValue.value = _this.calcPeriod();
      });
   }

   addIncomeBlock() {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   }

   addExpensesBlock() {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   }

   getExpInc() {
      const count = item => {
         const startStr = item.className.split('-')[0];
         const itemTitle = item.querySelector(`.${startStr}-title`).value;
         const itemAmount = item.querySelector(`.${startStr}-amount`).value;
         if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = +itemAmount;
         }
      }

      incomeItems.forEach(count);
      expensesItems.forEach(count);

      for (const key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }

   getAddExpenses() {
      const addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   }

   getAddIncome() {
      additionalIncomeItem.forEach(item => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   }

   getExpensesMonth() {
      let result = 0;
      for (const key in this.expenses) {
         result += +this.expenses[key];
      }
      this.expensesMonth = result;
      return result;
   }

   getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + monthDeposit;
      this.budgetDay = Math.ceil(Math.floor(this.budgetMonth / 30));
   }

   getTargetMonth() {
      const result = Math.ceil(targetAmount.value / this.budgetMonth);
      if (result <= 0) {
         return 'Цель не будет достигнута';
      } else {
         return `Цель будет достигнута через ${result} месяцев`;
      }
   }

   getStatusIncome() {
      if (this.budgetDay >= 1200) {
         return ('У Вас высокий уровень дохода');
      } else if (this.budgetDay >= 600) {
         return ('У Вас средний уровень дохода');
      } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
         return ('К сожалению у Вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   }

   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }

   reset() {

      const inputTextData = document.querySelectorAll('.data input[type = text]');
      const resultInputAll = document.querySelectorAll('.result input[type = text]');

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

   getInfoDeposit() {
      if (this.deposit) {
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
      }
   }

   changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
         depositPercent.style.display = 'inline-block';
         depositPercent.value = '';
         depositPercent.addEventListener('input', function () {
            if (depositPercent.value > 100) {
               depositPercent.value = 100;
            } else {
               depositPercent.value = depositPercent.value;
            }
         });
      } else {
         depositPercent.value = valueSelect;
         depositPercent.style.display = 'none';
      }
   }

   depositHandler() {
      if (depositCheck.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);
      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);
      }
   }

   eventsListeners() {

      start.addEventListener('click', this.start.bind(this));
      incomePlus.addEventListener('click', this.addIncomeBlock);
      expensesPlus.addEventListener('click', this.addExpensesBlock);
      salaryAmount.addEventListener('keyup', this.check);
      cancel.addEventListener('click', this.reset.bind(this));
      periodSelect.addEventListener('input', function () {
         numberPeriod.textContent = periodSelect.value;
      });
      depositCheck.addEventListener('change', this.depositHandler.bind(this));
   }
};

const appData = new AppData();
appData.eventsListeners();