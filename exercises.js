/*** Array Functions ***/
/*
0. Sa se scrie o functie care primeste array-ul de mai jos ca parametru si returneaza un 
array de numere unde toate numerele au fost adunate cu 2
*/
console.clear();
const strArr = ['13', '2', '34', '14', '5', '86', '3.46'];

console.log('Typecast: ', typeCastAndAdd(strArr));

function typeCastAndAdd(arr) {
  // const newArr = [];
  // // for (let i = 0; i < arr.length; i++) {
  // //   const item = arr[i];
  // //   newArr.push(Number(item) + 2);
  // // }
  // for (const item of arr) {
  //   newArr.push(Number(item) + 2);
  // }
  // return newArr;

  return arr.map((item) => Number(item) + 2);
}

console.log(
  'Sum of all numbers: ',
  typeCastAndAdd(strArr).reduce((sum, item) => sum + item)
);

// Array.prototype.myMap = function (mapFn) {
//   const res = [];

//   for (const item of this) {
//     res.push(mapFn(item));
//   }

//   return res;
// };

// console.log(
//   'MyMap: ',
//   strArr.myMap((item) => Number(item) + 2)
// );

// function User(firstName, age) {
//   this.firstName = firstName;
//   this.age = age;
// }

// User.prototype.saySomething = function () {
//   console.log(this.firstName + ' said something.');
// };

// User.prototype.toString = function () {
//   return this.firstName;
// };

// // const user1 = new User('Paul', 38);
// // const user2 = new User('Ana', 24);
// // user2.saySomething();
// // user1.saySomething();
// // console.log(user1.toString());

// class Admin extends User {
//   isAdmin = true;

//   constructor(firstName, age) {
//     super(firstName, age);
//     // this.isAdmin = true;
//   }

//   doAdminStuff() {
//     console.log(this.firstName + ' does admin stuff.');
//   }
// }

// const user1 = new Admin('Ionela', 50);
// user1.doAdminStuff();
// console.log(user1);

/* 
1. Sa se implementeze o functie care primeste un array de obiecte si un nume de 
cheie si returneaza un array cu toate valorile corespunzatoare cheii din obiectele din array.
*/
const demoArr = [
  { id: 1, color: 'red', height: 15, width: 20, distance: 10 },
  { id: 2, color: 'green', height: 5, width: 30, distance: 15 },
  { id: 3, color: 'turqoize', height: 7, width: 9, distance: 8 },
  { id: 4, color: 'blue', height: 2, width: 3, distance: 3 },
  { id: 5, color: 'red', height: 10, width: 10, distance: 2 },
  { id: 6, color: 'crimson', height: 7, width: 8, distance: 16 },
];

function pluck(arr, key) {
  return arr.map((item) => item[key]);
}

console.log('Pluck: ', pluck(demoArr, 'color')); // => ['red', 'green', 'turqoize' .......];

/*
2. Sa se implementeze o functie care returneaza ariile tuturor elementelor 
din array-ul de mai sus, aria e inaltime * latime.
*/
console.log('Calclulate area:', calculateArea(demoArr));

function calculateArea(arr) {
  return arr.map((item) => item['width'] * item.height);
}

/*
3. Sa se scrie o functie care returneaza un subset din array-ul de mai sus unde 
elementele au aria mai mica sau egala cu 100
*/
function filterArr(arr) {
  // const newArr = [];
  // for (const item of arr) {
  //   if (item.width * item.height <= 100) {
  //     newArr.push(item);
  //   }
  // }
  // return newArr;
  return arr.filter((item) => item.width * item.height <= 100);
}

console.log('Filter: ', filterArr(demoArr));

/*
4. Sa se implementeze o functie numita reject, care primeste un array si o functie iterator. 
Functia iterator primeste cate un element din array ca si parametru si trebuie sa returneze 
true sau false. Daca returneaza true, elementul in cauza nu va fi inclus de functia parinte 
in array-ul rezultat. Daca returneaza false va fi inclus.
*/
// console.log(reject(demoArr, iterator)); // item.width * item.height <= 100

function iterator(item) {
  return item.width * item.height <= 100;
}

function reject(arr, cb) {
  return arr.filter((item) => !cb(item));
}

console.log('Reject', reject(demoArr, iterator));

/*
5. Sa se scrie o functie care returneaza elementul cu culoarea din al doilea argument
*/
console.log('Find Color: ', findColor(demoArr, 'red'));

function findColor(arr, color) {
  // for (const item of arr) {
  //   if (item.color === color) {
  //     return item;
  //   }
  // }

  return arr.find((item) => item.color === color);
}
/*
6. Sa se scrie o functie care returneaza true daca toate elementele din array
au aria >= cu al doilea argument, false altfel.
*/
console.log('Areas are Bigger: ', areasAreBigger(demoArr, 7));

function areasAreBigger(arr, area) {
  // for (const item of arr) {
  //   if (!(item.width * item.height >= area)) {
  //     return false;
  //   }
  // }

  // return true;
  return arr.every((item) => item.width * item.height >= area);
}

/*
7. Sa se scrie o functie care returneaza true daca cel putin unul din elementele 
array-ului are culoarea color;
*/
console.log('At Least One: ', atLeastOneIsOfColor(demoArr, 'green'));

function atLeastOneIsOfColor(arr, color) {
  return arr.some((item) => item.color === color);
}

/*
8. Sa se scrie o functie care returneaza distanta totala (suma distantelor elementelor)
*/
console.log('Sum of distances: ', sumOfDistances(demoArr));

function sumOfDistances(arr) {
  // let sum = 0;
  // for (const item of arr) {
  //   sum = sum + item.distance;
  // }

  // return sum;
  return arr.reduce((sum, item) => sum + item.distance, 0);
}

/*
9. Sa se scrie o functie care returneaza un obiect in care se numara de cate ori apare 
fiecare culoare in parte in array-ul de obiecte. {red: 2, blue: 1, etc...}
*/
console.log('Number of colors: ', noColors(demoArr));

function noColors(arr) {}

/*
10. Sa se scrie o functie care returneaza un array cu toate elementele care au o culoare unica. 
Oricare element dupa primul care are o culoare care s-ar repeta nu este inclus in array.
*/
console.log('Unique Colors: ', uniqueColors(demoArr));

function uniqueColors(arr) {
  const res = [];
  const seenColors = {};
  for (const item of arr) {
    if (!seenColors[item.color]) {
      seenColors[item.color] = true;
      res.push(item);
    }
  }
  return res;
}

/*
[
  {id: 1, color: 'red', height: 15, width: 20, distance: 10},
  {id: 2, color: 'green', height: 5, width: 30, distance: 15},
  {id: 3, color: 'turqoize', height: 7, width: 9, distance: 8},
  {id: 4, color: 'blue', height: 2, width: 3, distance: 3},
  {id: 6, color: 'crimson', height: 7, width: 8, distance: 16},
]
*/

/*
11. Sa se inverseze doua variabile.
*/
let firstName = 'Negoescu',
  lastName = 'Paul';

// const temp = firstName;
// firstName = lastName;
// lastName = temp;
[lastName, firstName] = [firstName, lastName];

console.log({ firstName, lastName });

/*
12. Folosind array-ul de mai jos, vreau sa se obtina o variabila care contine un array de obiecte strcturat astfel:
[
  {subject: 'Chemistry', time: '9AM', teacher: 'Mr. Darnick'},
  ...
]
*/
const classes = [
  ['Chemistry', '9AM', 'Mr. Darnick'],
  ['Physics', '10:15AM', 'Mrs. Lithun'],
  ['Math', '11:30AM', 'Mrs. Vitalis'],
];

const objClasses = {};

console.log('Classes: ', objClasses);

// console.clear();

const result1 = [
  { id: 1, name: 'Sandra', type: 'user', username: 'sandra' },
  { id: 2, name: 'John', type: 'admin', username: 'johnny2' },
  { id: 3, name: 'Peter', type: 'user', username: 'pete' },
  { id: 4, name: 'Bobby', type: 'user', username: 'be_bob' },
];

const result2 = [
  { id: 2, name: 'John', email: 'johnny@example.com' },
  { id: 4, name: 'Whatever', email: 'bobby@example.com' },
];

const props = ['id', 'name'];

function arrayIntersection(arr1, arr2, props) {}

function arrayIntersection2(arr1, arr2) {}

console.log(arrayIntersection2(result1, result2, props));

// Template literal
const str = myTag`dsadasdadsdas sad ${props[0].toUpperCase()} sadasd

sdasdasdas ${1}

asdasdas`;

// Tagged template literal
function myTag(bucatile, id, unu) {
  console.log(id, unu);
}

console.log(str);
