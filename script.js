'use strict';

const money = Number(prompt('Ваш месячный доход?')),
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 200000,
   period = 10,
   expenses1 = prompt('Введите обязательную статью расходов №1'),
   amount1 = Number(prompt('Во сколько это обойдётся?')),
   expenses2 = prompt('Введите обязательную статью расходов №2'),
   amount2 = Number(prompt('Во сколько это обойдётся?')),
   getExpensesMonth = function () {
      return amount1 + amount2;
   },
   getAccumulatedMonth = function () {
      return money - getExpensesMonth();
   },
   accumulatedMonth = getAccumulatedMonth(),
   budgetDay = Math.floor(accumulatedMonth / 30),
   periodMission = Math.ceil(mission / accumulatedMonth),
   showTypeOf = function (data) {
      console.log(data, typeof (data));
   },
   getTargetMonth = function () {
      return Math.ceil(mission / accumulatedMonth);
   },
   getStatusIncome = function () {
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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(`Расходы за месяц: ${getExpensesMonth()}`);
console.log(addExpenses.toLowerCase().split(','));
console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());
