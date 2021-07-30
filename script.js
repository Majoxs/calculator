'use strict';

const money = 1000,
   income = 'Фриланс',
   addExpenses = 'Коммуналка, Питание, Интернет, Развлечения',
   deposit = true,
   mission = 10000,
   period = 10,
   budgetDay = Math.floor(money / 30);

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} долларов.`);

console.log(addExpenses.toLowerCase().split(','));

console.log(budgetDay);