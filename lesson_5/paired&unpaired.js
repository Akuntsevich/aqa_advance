/**
 *      if (умова) {
 *          код що буде виконуватись якщо умова істина
 *      } else {
 *          код що буде виконуватись якщо умова не істина
 *      }
 */

let number = 11;

if (number % 2 === 0) {
    console.log(number + ": " + "Парне число");
} else {
    console.log(number + ": " + "Не парне число");
}

/**
 *      ? - тернарний оператор
 */

let number_ter = 7;
let result = (number_ter % 2 === 0) ? "Парне число" : "Не парне число";
console.log(result);
