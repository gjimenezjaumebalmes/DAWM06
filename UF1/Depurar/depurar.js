/*Depuració:
    Exercicis:
        Exercici 1 - Troba els errors al següent Codi i arregla'ls*/
<html>
<script>
function mitjana(llista) {
    var suma = 0;
    for (let i = 0; i < llista.length, i++) {
        let suma += i;
    }
    return suma/llista.length;
}
console.log(mitjana([0,1,2,3,4]));
console.log(mitjana([6,1,5,7,4]));
</script>
</html>

/*Exercici 2 - Troba els errors al següent Codi i arregla'ls*/
<html>
<script>
function sumaParells(llista) {
    let suma = 0;
    for (let i = 0; i < llista.length; i++) {
        if (i % 2 =- 0) {
            suma += llista[i];
        }
    }
    return suma;
}
console.log(sumaParells([0,1,2,3,4]));
console.log(sumaParells([6,1,5,7,4]));
</script>
</html>

/*Exercici 3 - Troba els errors al següent Codi i arregla'ls*/
<html>
<script>
function sumaSenars(llista) {
    let suma = 0;
    let i = 0;
    while (i < llista.length) {
        i++;
        if (i % 2 == 1) {
            suma += llista[i];
        }
    }
    return suma;
}
console.log(sumaSenars([0,1,2,3,4]));
console.log(sumaSenars([6,1,5,7,4]));
</script>
</html>

/*Exercici 4 - Troba els errors al següent Codi i arregla'ls:*/
<html>
<script>
function incrementa() {
    let comptador =
        parseInt(document.getElementById('comptador').innerHTML);

    document.getElementById('Comptador').innerHTML = comptador++;
}
</script>
<body>
<button type="button" onclick= "incrementa()"> Incrementa </button>
<div id="comptador">0</div>