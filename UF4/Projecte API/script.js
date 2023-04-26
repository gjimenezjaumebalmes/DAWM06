const selectPlato = document.getElementById('plato');
const btnCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado');
const divIngredientes = document.getElementById('ingredientes');

let platos = {};

// Recuperamos la lista de platos del archivo JSON
fetch('food.json')
    .then(response => response.json())
    .then(data => {
        platos = data;
        btnCalcular.disabled = false;
    })
    .catch(error => {
        console.error(error);
        mostrarError();
    });

btnCalcular.addEventListener('click', () => {
    const platoSeleccionado = selectPlato.value;
    if (platoSeleccionado) {
        const ingredientes = platos[platoSeleccionado].ingredientes;
        const ingrString = ingredientes.join('\n');

        // Llamada a la API de Edamam para obtener la información nutricional
        fetch(`https://api.edamam.com/api/nutrition-data?app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY&ingr=${encodeURIComponent(ingrString)}`)
            .then(response => response.json())
            .then(data => {
                mostrarResultado(platos[platoSeleccionado], data);
                mostrarIngredientes(platos[platoSeleccionado].ingredientes);
            })
            .catch(error => {
                console.error(error);
                mostrarError();
            });
    }
});

function mostrarResultado(plato, data) {
    let html = `<h2>${plato.nombre}</h2>`;
    html += '<table>';
    html += `<tr><td><strong>Calorías</strong></td><td>${data.calories}</td></tr>`;
    html += `<tr><td><strong>Proteínas</strong></td><td>${data.totalNutrients.PROCNT.quantity.toFixed(2)} ${data.totalNutrients.PROCNT.unit}</td></tr>`;
    html += `<tr><td><strong>Grasas</strong></td><td>${data.totalNutrients.FAT.quantity.toFixed(2)} ${data.totalNutrients.FAT.unit}</td></tr>`;
    html += `<tr><td><strong>Carbohidratos</strong></td><td>${data.totalNutrients.CHOCDF.quantity.toFixed(2)} ${data.totalNutrients.CHOCDF.unit}</td></tr>`;
    html += '</table>';

    divResultado.innerHTML = html;
}

function mostrarError() {
    divResultado.innerHTML = '<p>Ha ocurrido un error al obtener la información nutricional del plato. Por favor, intenta de nuevo más tarde.</p>';
}

function mostrarIngredientes(ingredientes) {
    let html = '<ul>';
    for (let i = 0; i < ingredientes.length; i++) {
        html += `<li>${ingredientes[i]}</li>`;
    }
    html += '</ul>';

    divIngredientes.innerHTML = html;
}
