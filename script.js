let money = 1000,
   income = '500',
   addExpenses = 'Коммуналка, Питание, Интернет, Развлечения',
   deposit = true,
   mission = 10000,
   period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев. Цель заработать ' + mission + ' долларов.');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = (money + (+income)) / 30;
console.log(budgetDay);