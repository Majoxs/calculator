'use strict';


let money,
   start = function () {
      do {
         money = +prompt('Ваш месячный доход?');
      }
      while (isNaN(money) || money === '' || money === null || money == 0);
   };

start();

const appData = {
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   expensesMonth: 0,
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 50000,
   period: 3,
   asking: function () {

      if (confirm('Есть ли у вас дополнительный источник заработка?')) {
         let itemIncome = prompt('Какой у вас дополнительный заработок?');
         while (!isNaN(itemIncome) || typeof itemIncome !== 'string' || typeof itemIncome === null || itemIncome.trim() === '') {
            itemIncome = prompt('Какой у вас дополнительный заработок?');
         };
         let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
         while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null || cashIncome == 0) {
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
         };

         appData.income[itemIncome] = cashIncome;
      }

      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++) {
         let itemExpenses = prompt('Введите обязательную статью расходов');
         while (!isNaN(itemExpenses) || typeof itemExpenses !== 'string' || typeof itemExpenses === null || itemExpenses.trim() === '') {
            itemExpenses = prompt('Введите обязательную статью расходов');
         };
         let cashExpenses;
         while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null || cashExpenses == 0) {
            cashExpenses = +prompt('Во сколько это обойдётся?');
         };
         appData.expenses[itemExpenses] = +cashExpenses;
      }
   },
   getExpensesMonth: function () {

      for (let key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      let target = Math.ceil(appData.mission / appData.budgetMonth);
      if (target >= 0) {
         console.log(`Цель будет достигнута за ${target} месяцев(-а)`);
      } else {
         console.log('Цель не будет достигнута');
      }
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
   calcSavedMoney: function () {
      return appData.budgetMonth * appData.period;
   }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
appData.getTargetMonth();
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
   console.log('Свойства: ' + key + '\n' + 'Значение: ' + appData[key]);
}

const word = appData.addExpenses.map(item => {
   const newWord = item[0].toUpperCase() + item.slice(1);
   return newWord;
});
console.log(word.join(', '));