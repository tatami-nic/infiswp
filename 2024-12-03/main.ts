//Programm mit Schleifen, das von 1 bis 10 zählt zur Übung
    //for (let zahl = 1; zahl <= 10; zahl++) {
    //    console.log(zahl + '/n');
    //}

//Personen in eine Datenbank übertragen, Programm zum üben für den Test
import { fakerDE } from "@faker-js/faker";
function newPerson() {
  const gender = fakerDE.person.sexType();
  const vorn = fakerDE.person.firstName(gender);
  const nachn = fakerDE.person.lastName();
  const size = fakerDE.number.int({ min: 100, max: 230 });
  const birth = fakerDE.date.past({ years: 20 }).toISOString();
  return `${vorn}|${nachn}|${gender}|${size}|${birth}`;
}
if (import.meta.main) {
  for (let i = 1; i <= 10; i++) {
    console.log(newPerson());
  }
}
