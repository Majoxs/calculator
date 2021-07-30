'use strict';

let money = 1000,
   income = 'Фриланс',
   addExpenses = 'Коммуналка, Питание, Интернет, Развлечения',
   deposit = true,
   mission = 10000,
   period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев. Цель заработать ' + mission + ' долларов.');

addExpenses = addExpenses.toLowerCase().split(',');
console.log(addExpenses);

let budgetDay = Math.floor(money / 30);

console.log(budgetDay);