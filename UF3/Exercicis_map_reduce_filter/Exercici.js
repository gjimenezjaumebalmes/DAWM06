

// Una funció que donat un array retorni un nou array amb l'arrel quadrada de cadascun dels valors.
function EX1() {
    let numeros = [1,2,3,4,5,6,7,8];
    numeros.forEach(function(x, index, array){
        array[index] = x*x;
    });
    console.log(numeros);
}

EX1()

// Una funció que retorni la suma dels elements positius d'un array.

function EX2() {
    let numeros = [-5, 10, -3, 12, -9, 5, 90, 0, 1];

    function positius(array) {
        return array.filter(x => x > -1);
    }

    let resultat = positius(numeros);
    console.log(resultat);
}

EX2()

// Una funció que calculi el factorial d'un número. (proveu què fa Array.from(Array(10).keys())
function EX3() {

    //Opcio 1
    // let a = [1, 2, 3, 4, 5];
    // function fact(x) {
    //    return (x === 0) ? 1 : x * fact(x-1);
    // }
    // console.log(a.map(fact));


}

EX3()

// Una funció que et retorni la mida de cada array en un array d'arrays
function EX4() {
    let array1 = [1,2];
    let array2 = [1,3,1,2];
    let array3 = [1,2,1];
    let arrays = [array1,array2,array3];
    const numArray = arrays.map(x => x.length );
    console.log(numArray);
}

EX4()

// Una funció volem que ens retorni els noms dels treballadors del deparatament IT que cobren menys de 60000
function EX5() {
    let employees = [
        { name: "John", salary: 50000, department: "IT" },
        { name: "Jane", salary: 60000, department: "HR" },
        { name: "Bob", salary: 55000, department: "IT" },
        { name: "Sophie", salary: 75000, department: "HR" },
        { name: "Mike", salary: 65000, department: "IT" },
        { name: "Emily", salary: 80000, department: "HR" },
        { name: "David", salary: 70000, department: "IT" },
    ];
    // employees.forEach((emp)=>console.log(emp));
    let PaidEmployees = employees.filter(empl => empl.salary<60000);
    let ITPAIDEmployees = PaidEmployees.filter(empl => empl.department="IT");
    console.log(ITPAIDEmployees);
}

EX5()