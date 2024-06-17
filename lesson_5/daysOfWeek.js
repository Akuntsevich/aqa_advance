/**
 *      switch (вираз) {
 *          case значення_1:
 *          break;
 *              код що виконається після значення_1
 *          case значення_2:
 *          break;
 *              код що виконається після значення_2
 *          default:
 *              код що виконається якщо не будуть виконанні значення_1 та значення_2
 *      }
 * 
 */

let day = 7;
let dayName;

switch (day) {
    case 1: 
        dayName = "Понеділок";
        break;
    case 2:
        dayName = "Вівторок";
        break;
    case 3:
        dayName = "Середа";
        break;
    case 4:
        dayName = "Черверг";
        break;
    case 5:
        dayName = "П'ятниця";
        break;
    case 6:
        dayName = "Субота";
        break;
    case 7:
        dayName = "Неділя";
        break;
    default:
        dayName = "Невідомий день"
}
console.log(dayName);
