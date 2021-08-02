'use strict';

const money = Number(prompt('Ваш месячный доход?')),
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 200000,
   expenses1 = prompt('Введите обязательную статью расходов №1'),
   amount1 = Number(prompt('Во сколько это обойдётся?')),
   expenses2 = prompt('Введите обязательную статью расходов №2'),
   amount2 = Number(prompt('Во сколько это обойдётся?')),
   budgetMonth = money - (amount1 + amount2),
   period = Math.ceil(mission / budgetMonth),
   budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);
console.log(addExpenses.toLowerCase().split(','));
console.log(`Бюджет на месяц: ${budgetMonth}`);
console.log(`Цель будет достигнута за ${period} месяцев(-а)`);
console.log(`Бюджет на день: ${budgetDay}`);

let definition = budgetDay >= 1200 ? console.log('У Вас высокий уровень дохода') :
   budgetDay >= 600 && budgetDay < 1200 ? console.log('У Вас средний уровень дохода') :
      budgetDay < 600 && budgetDay >= 0 ? console.log('К сожалению у Вас уровень дохода ниже среднего') :
         console.log('Что-то пошло не так');
