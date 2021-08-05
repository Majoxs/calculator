'use strict';

const isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 200000,
   period = 10;

const start = function () {

   do {
      money = prompt('Ваш месячный доход?');
   }
   while (!isNumber(money));

};

start();

const showTypeOf = function (data) {
   console.log(data, typeof (data));
};

const getTargetMonth = function () {
   return Math.ceil(mission / accumulatedMonth);
};

const getStatusIncome = function () {
   if (budgetDay >= 1200) {
      return ('У Вас высокий уровень дохода');
   } else if (budgetDay >= 600) {
      return ('У Вас средний уровень дохода');
   } else if (budgetDay < 600 && budgetDay >= 0) {
      return ('К сожалению у Вас уровень дохода ниже среднего');
   } else {
      return ('Что-то пошло не так');
   }
};

let expenses = [];
let getExpensesMonth = function () {
   let sum = 0;
   let prob = 0;
   for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов');
      prob = prompt('Во сколько это обойдётся?');

      while (!isNumber(prob)) {
         prob = prompt('Во сколько это обойдётся?');
      }
      sum += +prob;
   }
   return sum;
};

const expensesAmount = getExpensesMonth();
const getAccumulatedMonth = function () {
   return money - expensesAmount;
};
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
const periodMission = Math.ceil(mission / accumulatedMonth);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(`Расходы за месяц: ${expensesAmount}`);
console.log(addExpenses.toLowerCase().split(','));
if (getTargetMonth() >= 0) {
   console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);
} else {
   console.log('Цель не будет достигнута');
}
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());
