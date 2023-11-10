'use strict';

/*
# Scope

Global: cand declar o variabila direct intr-un fisier non-modul sau ca si proprietate pe obiectul global
Function: cand declar o variabila intr-o functie
Block: const si let sunt vizibile intre acoladele (denota un block de cod) cele mai apropiate si doar acolo
Module: declaratiile facute intr-un fisier tip modul
*/

let nume = 'Paul';

console.log(nume);

let c = 43;
function test(a, b) {
  const c = 'test';
  globalThis.d = 4;
  console.log({ a, b, c });
}

const test2 = (a, b) => {
  const c = 'test';
  globalThis.d = 4;
  console.log({ a, b, c });
};

test(1, 2);

// Function Expression
const sum = function (a, b) {
  return a + b;
};

// IIFE - Immediately Invoked Function Expression
(function (a = 2, b = 2) {
  console.log('IIFE: ', a + b);
})(5, 6);

// Arrow function
const prod = (a = 2, b = 2) => a * b;

console.log('Produsul este: ', prod(3));

if (1) {
  const testblock = 1;
  console.log(testblock);
}

// Closures
function parent(a) {
  const b = 2;

  return function (c) {
    console.log('Child:', a + b + c);
  };
}

const child = parent(1);
const child2 = parent(5);
child(3);
child2(3);

for (let i = 0; i < 5; i++) {
  // setTimeout(() => console.log(i), 2000);
}

// Async
console.clear();
console.log(1);
// setTimeout(() => console.log(2), 1000);
// setTimeout(() => console.log(3), 0);
// for (let i = 0; i < 5000000000; i++) {
//   i * 5 * 5 * 5;
// }
console.log(4);

// Primitive Data Types
/*
  String
  Number
  Boolean
  undefined
  null
  Symbol
  Bigint
*/
//Complex Data Types
/*
  Object
    Array
    Function
    Map 
    Set
    WeakMap
    WeakSet
*/

const o1 = {
  firstName: 'Paul',
  lastName: 'Negoescu',
  height: 1.85,
  weight: 100,
  calculateBmi() {
    //setTimeout(() => console.log(this), 1000);
    return this;
  },
  calculateBmi2: () => this,
  0: 1,
  1: 2,
  lenght: 2,
  'proprietate-ciudata': 'valoare',
};

// console.log(o1.calculateBmi(), o1.calculateBmi2());

console.log(o1.calculateBmi());
const funcAlt = o1.calculateBmi;

const o2 = {
  cbmi: o1.calculateBmi.bind('Costi'),
};

console.log(o2.cbmi.apply(o2));

const prop = 'firstName';
console.log(o1['calculateBmi']());
//this
/*
  1. this is determined at function execution time
    a. this is whatever is to the left of the dot 
      i. if using use strict and there is nothing to the left of the dot this is undefined
      ii. if not using strict ---- " ----- this is window
    b. this is set by the programmer using call() or apply()
  2. this is detemined in some cases at the moment of function creation
    a. arrow functions treat this like a variable and will set it's value to whatever it is in the current scope
    b. this is set by the programmer at function creation using bind()
  3. this inside of constructor functions is a special case
*/

console.clear();

const arr = [
  1,
  'Paul',
  o1,
  function () {
    return 'func';
  },
];

if (2 === true) {
  console.log('aici');
} else {
  console.log('dincolo');
}
const condition = false;

do {} while (condition);

{
  let i = 0;
  while (i < arr.length) {
    const elem = arr[i];
    console.log(elem);
    i++;
  }
}

for (let i = 0; i < arr.length; i++) {
  const elem = arr[i];
  console.log(elem);
}

for (const elem of arr) {
  console.log(elem);
}

for (const prop in o1) {
  const val = o1[prop];
  console.log(val);
}

console.clear();

const res = arr.forEach((val) => console.log(val));
console.log(res);

// Spread operator
const obj1 = {
  prop1: 'test',
  arr: [1, 2, 3],
};

const obj2 = {
  prop2: 'doi',
};

const obj3 = {
  ...obj1,
  prop1: 'dasdasd',
  ...obj2,
};

const obj4 = { ...obj1 };
const obj5 = obj1;
obj5.altceva = 42;
obj4.prop1 = 12;
obj4.arr[0] = 9;

const obj6 = structuredClone(obj1);
obj6.arr[0] = 14;

console.log(obj1, obj4, obj5, obj6);

// Rest Parameter
function restParam(a, b, c = 6, ...d) {
  console.log(a, b, c, d);
}
console.clear();
restParam(1, 2, 3, 4, 5, 6);

// spread an array as arguments for a function call
restParam(...obj3.arr);

// Object and Array Destructuring
const arr2 = [1, 2, 3];
console.log(obj1);

const [, , trei] = arr2;
const { arr: myArr, prop1, paul = 'implicit' } = obj1;

console.log({ trei, myArr, prop1, paul });

function destruct({ altceva, prop1 = 'implicit', paul = 'implicit' }) {
  console.log(altceva, prop1, paul);
}

destruct(obj1);

// Shorthand condtional statements
const something = true || 'test';
console.log(something);

const variabila = arr && 'dsasdsadas';

function nullishCoalescing(a) {
  const unu = a ?? 2;
  return unu * 2;
}

console.log(nullishCoalescing(null));

//Elvis operator, optional chaining
console.log(obj1.arr.length?.toFixed(2));
