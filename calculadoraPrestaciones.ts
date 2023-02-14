/*

******************************************************************** Daniel Hernandez*************************************

Programa que calcule las prestaciones de un empleado de acuerdo a las reglas establecidas 
en el Ministerio de Trabajo de República Dominicana


Input :
    1. Nombre de la persona
    2. Salario Mensual
    3. Cantidad de años, meses y días laborando
    4. Si ha sido preavisado
    5. Si hay que incluir cesantía
    6. Si ha tomado vacaciones en el último año
    7. Si incluye el salario de navidad

Output:
    1. Monto del Preaviso
    2. Monto de la Cesantía
    3. Monto de las Vacaciones
    4. Monto del Salario de Navidad
    5. Monto total a recibir

1. Se ingresa el nombre de la persona
2. Se ingresa el salario Mensual
3. Ingresar una fecha inicial y una final
    3.1 Seleccionar el tipo de periodo para de ahi hacer el calculo correspondiente (Anual, Mensual y Diario)
4. Se define si fue pre-avisado
5 Se define si incluye cesantia
6. Se define si ha tomado vacaciones
7. Se realiza el calculo de la navidad
8. Se realiza el calculo y se muestra el resultado.
 */

const NUMBER_OF_DAYS_IN_MONTH = 23.83;
const MONTHS_IN_A_YEAR = 12;
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const AVERAGE_DAYS_MONTHS_IN_YEAR = 30.47;
const FIVE_YEARS = 60;
const MONTH_TO_YEAR = NUMBER_OF_DAYS_IN_MONTH * MONTHS_IN_A_YEAR

type Person = {
    name: string;
    id: string;
    salary: number;
    paymentFrequency: "Anual" | "Mensual" | "Diario",
    entryDate: number;
    departureDate: number;
    forewarned: boolean;
    unemployment: boolean;
    vacation: boolean;
    christmasSalary: boolean;

}

//Conversor de salario a dias
function expressSalaryInDays(person: Person) {
    const salaryInDays = person.salary;
    return salaryInDays / NUMBER_OF_DAYS_IN_MONTH;
}

//Conversor de fechas en milisegundos a dias
function periodInDays(person: Person) {
    return (person.departureDate - person.entryDate) / (MILLISECONDS_IN_DAY);

}

//Preaviso
function calculateForewarned(person: Person, salary: number) {
    const forewarned = person.forewarned;
    const period = periodInDays(person) / AVERAGE_DAYS_MONTHS_IN_YEAR;

    if (forewarned == false) {
        if (period > 3 && period < 6) {
            return 7 * salary;
        }

        else if (period >= 6 && period < MONTHS_IN_A_YEAR) {
            return 14 * salary;
        }

        else if (period>= MONTHS_IN_A_YEAR){
            return 28 * salary;
        }
    }
    return 0;
}


function calculateUnemploymentDifference(period: number, salary:number) {
    let days = 0;
       
    if (period >= 3 && period < 6) {
        days = 6;
    }
    else if (period >= 6 && period < MONTHS_IN_A_YEAR) {
        days = 13;
    }
    else if (period >= MONTHS_IN_A_YEAR && period < FIVE_YEARS) {
        days = 21 * (period / MONTHS_IN_A_YEAR);
    }
    else if(period >= FIVE_YEARS) {
        days = 23 * (period / MONTHS_IN_A_YEAR);
    }
    return salary * days;
}
 


//Auxilio de Cesantia
function unemploymentAssistance(person: Person, salary: number) {
    let period = periodInDays(person) / AVERAGE_DAYS_MONTHS_IN_YEAR;

    const unemployment = person.unemployment;
    
    if (unemployment) {
        let days = 0;
        let differenceSalary = (((period / 12) % 1) * 10);
        if (period >= 3 && period < 6) {
            days = 6;
        }
        else if (period >= 6 && period < MONTHS_IN_A_YEAR) {
            days = 13;
        }
        else if (period >= MONTHS_IN_A_YEAR && period < FIVE_YEARS) {
            days = 21 * Math.trunc(period / MONTHS_IN_A_YEAR);
            return (salary * days) + calculateUnemploymentDifference(differenceSalary,salary);
        }
        else if(period>= FIVE_YEARS) {
            days = 23 * Math.trunc(period / MONTHS_IN_A_YEAR);
        
            return (salary * days) + calculateUnemploymentDifference(differenceSalary,salary);
            
        }
        return salary * days;
    }

    return 0;

}

//Calculo de las vacaciones
function vacations(person: Person, salary: number) {
    const period = periodInDays(person) / AVERAGE_DAYS_MONTHS_IN_YEAR;



    if (person.vacation == false) {
        if (period >= 5 && period < 6) {
            return 6 * salary;
        }
        else if (period >= 6 && period < 7) {
            return 7 * salary;
        }
        else if (period >= 7 && period < 8) {
            return 8 * salary;
        }
        else if (period >= 8 && period < 9) {
            return 9 * salary;
        }
        else if (period >= 9 && period < 10) {
            return 10 * salary;

        }
        else if (period >= 10 && period < 11) {
            return 11 * salary;
        }
        else if (period >= 11 && period < MONTHS_IN_A_YEAR) {
            return 12 * salary;
        }
        else if (period >= MONTHS_IN_A_YEAR && period < FIVE_YEARS) {
            return 14 * salary;
        } else if (period >= FIVE_YEARS) {
            return 18 * salary
        }
    }

    const exitDate = new Date(person.departureDate);
    let monthYear;

    monthYear =  ( exitDate.getMonth());
    console.log(monthYear)
    if (monthYear > 5 && monthYear <= 6) {
        return 6 * salary;
    }
    else if (monthYear > 6 && monthYear <= 7) {
        return 7 * salary;
    }
    else if (monthYear > 7 && monthYear <= 8) {
        return 8 * salary;
    }
    else if (monthYear > 8 && monthYear <= 9) {
        return 9 * salary;
    }
    else if (monthYear > 9 && monthYear <= 10) {
        return 10 * salary;

    }
    else if (monthYear > 10 && monthYear <= 11) {
        return 11 * salary;
    }
    else if (monthYear > 11 && monthYear <= MONTHS_IN_A_YEAR) {
        return 12 * salary;
    }

    return 0;



}


//Calculo del salario de navidad
function christmasSalary(person: Person, salary: number) {
    if (person.christmasSalary) {

        const exitDate = new Date(person.departureDate);
        const numberOfDays = new Date(exitDate.getFullYear(), exitDate.getMonth(), 0).getDate();
        const resultx = ((exitDate.getMonth() - 1) * person.salary) / MONTHS_IN_A_YEAR;
        const salaryDate = person.salary / MONTHS_IN_A_YEAR;
        const resulty = (exitDate.getDate() / numberOfDays * salaryDate);
        const result = resultx + resulty;
        return result;
    }
    return 0;
}

function outputCalculation(paymentFrequency: string, forewarned: number, unemployment: number, vacation: number, christmaS: number, result: number) {

    if (paymentFrequency == "Mensual") {
        return `1. Monto del Preaviso es: ${forewarned.toFixed(2)} DOP
        2. Monto de la Cesantía es: ${unemployment.toFixed(2)} DOP
        3. Monto de las Vacaciones es: ${vacation.toFixed(2)} DOP
        4. Monto del Salario de Navidad: ${christmaS.toFixed(2)} DOP
        5. Monto total a recibir es: ${result.toFixed(2)} DOP`;
    } else if (paymentFrequency == "Anual") {
        return `1. Monto del Preaviso es: ${(forewarned * MONTH_TO_YEAR).toFixed(2)} DOP
        2. Monto de la Cesantía es: ${(unemployment * MONTH_TO_YEAR).toFixed(2)} DOP
        3. Monto de las Vacaciones es: ${(vacation * MONTH_TO_YEAR).toFixed(2)} DOP
        4. Monto del Salario de Navidad: ${(christmaS * MONTH_TO_YEAR).toFixed(2)} DOP
        5. Monto total a recibir es: ${(result * MONTH_TO_YEAR).toFixed(2)} DOP`;
    } else if (paymentFrequency == "Diario") {
        return `1. Monto del Preaviso es: ${(forewarned * NUMBER_OF_DAYS_IN_MONTH).toFixed(2)} DOP
        2. Monto de la Cesantía es: ${(unemployment * NUMBER_OF_DAYS_IN_MONTH).toFixed(2)} DOP
        3. Monto de las Vacaciones es: ${(vacation * NUMBER_OF_DAYS_IN_MONTH).toFixed(2)} DOP
        4. Monto del Salario de Navidad: ${(christmaS * NUMBER_OF_DAYS_IN_MONTH).toFixed(2)} DOP
        5. Monto total a recibir es: ${(result * NUMBER_OF_DAYS_IN_MONTH).toFixed(2)} DOP`;

    }
    return 0
}

function benefitCalculation(person: Person) {
    const paymentFrequency = person.paymentFrequency;
    const salaryInDays = expressSalaryInDays(person);
    const forewarned = calculateForewarned(person, salaryInDays);
    const unemployment = unemploymentAssistance(person, salaryInDays);
    const vacation = vacations(person, salaryInDays);
    const christmaS = christmasSalary(person, salaryInDays);
    const result = forewarned + unemployment + vacation + christmaS;
    return outputCalculation(paymentFrequency, forewarned, unemployment, vacation, christmaS, result);
}




// Aqui abajo defino las personas
const danielHernandez: Person = {
    name: "Daniel Hernandez",
    id: "402-0946870-7",
    salary: 12000,
    paymentFrequency: "Mensual",
    entryDate: new Date(2014, 3, 1).getTime(),      
    departureDate: new Date(2020, 5, 1).getTime(), 
    forewarned: false,
    unemployment: true,
    vacation: false,
    christmasSalary: true
}


console.log(benefitCalculation(danielHernandez));