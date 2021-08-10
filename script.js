'use strict';

let money;
const start = function () {
   do {
      money = +prompt('Ваш месячный доход?');
   }
   while (isNaN(money) || money === '' || money === null || money == 0);
};

start();

let appData = {
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   addExpenses: [],
   addIncome: [],
   income: {},
   expenses: {},
   deposit: false,
   mission: 50000,
   period: 3,
   asking: function () {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++) {
         let question = prompt('Введите обязательную статью расходов');
         let answer;
         while (isNaN(answer) || answer === '' || answer === null || answer == 0) {
            answer = +prompt('Во сколько это обойдётся?');
         };
         appData.expenses[question] = +answer;
      }
   },
   getExpensesMonth: function () {
      let sum = 0;
      for (let key in appData.expenses) {
         sum += appData.expenses[key];
      }
      appData.expensesMonth = sum;
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
