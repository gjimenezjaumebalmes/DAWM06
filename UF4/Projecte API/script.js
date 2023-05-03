document.addEventListener('DOMContentLoaded', () => {
    const selectPlato = document.getElementById('plato');
    const btnCalcular = document.getElementById('calcular');
    const divResultado = document.getElementById('resultado');
    const divIngredientes = document.getElementById('ingredients');
    const btnEliminar = document.getElementById('eliminar');
    const btnReset = document.getElementById('reset');

    let platos = {};
    let nombreTabla = '';

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


    // Agregar listener al botón "Calcular"
    btnCalcular.addEventListener('click', () => {
        calcularNutrientes();
    });

    function calcularNutrientes() {
        // Crear la tabla vacía cuando se carga la página
        const tablaNutrientes = document.createElement('table');
        tablaNutrientes.innerHTML = `
<thead>
  <tr>
    <th>Nutriente</th>
    <th>Cantidad</th>
  </tr>
</thead>
<tbody>
  <tr class="calorias">
    <td>Calorías</td>
    <td id="calorias"></td>
  </tr>
  <tr class="grasas">
    <td>Grasas</td>
    <td id="grasas"></td>
  </tr>
  <tr class="grasasSat">
    <td>Grasas saturadas</td>
    <td id="grasasSat"></td>
  </tr>
  <tr class="carbohidratos">
    <td>Carbohidratos</td>
    <td id="carbohidratos"></td>
  </tr>
  <tr class="azucares">
    <td>Azúcares</td>
    <td id="azucares"></td>
  </tr>
  <tr class="proteinas">
    <td>Proteínas</td>
    <td id="proteinas"></td>
  </tr>
  <tr class="fibra">
    <td>Fibra</td>
    <td id="fibra"></td>
  </tr>
  <tr class="sodio">
    <td>Sodio</td>
    <td id="sodio"></td>
  </tr>
</tbody>`;
        divResultado.appendChild(tablaNutrientes);

// Función para actualizar la tabla con los valores de los nutrientes
        function actualizarTablaNutrientes(nutrientes) {
            // Recuperar una referencia a cada fila de la tabla por su clase
            const caloriasRow = tablaNutrientes.querySelector('.calorias');
            const grasasRow = tablaNutrientes.querySelector('.grasas');
            const grasasSatRow = tablaNutrientes.querySelector('.grasasSat');
            const carbohidratosRow = tablaNutrientes.querySelector('.carbohidratos');
            const azucaresRow = tablaNutrientes.querySelector('.azucares');
            const proteinasRow = tablaNutrientes.querySelector('.proteinas');
            const fibraRow = tablaNutrientes.querySelector('.fibra');
            const sodioRow = tablaNutrientes.querySelector('.sodio');

            // Actualizar el contenido de cada celda con el valor correspondiente
            caloriasRow.querySelector('td:last-child').textContent = nutrientes.calorias;
            grasasRow.querySelector('td:last-child').textContent = nutrientes.grasas;
            grasasSatRow.querySelector('td:last-child').textContent = nutrientes.grasasSat;
            carbohidratosRow.querySelector('td:last-child').textContent = nutrientes.carbohidratos
            azucaresRow.querySelector('td:last-child').textContent = nutrientes.azucares;
            proteinasRow.querySelector('td:last-child').textContent = nutrientes.proteinas;
            fibraRow.querySelector('td:last-child').textContent = nutrientes.fibra;
            sodioRow.querySelector('td:last-child').textContent = nutrientes.sodio;

        }
    }



    // Función para actualizar la lista de ingredientes
    function actualizarListaIngredientes(ingredients) {
        let html = '';
        for (let i = 0; i < ingredients.length; i++) {
            html += `<li class="ingredientes-item">${ingredients[i]}<button class="eliminar" data-index="${i}">Eliminar</button></li>`;
        }

        divIngredientes.innerHTML = html;

        const botonesEliminar = document.querySelectorAll('#ingredients .eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const index = boton.dataset.index;
                const ingredientesSeleccionados = divIngredientes.getElementsByTagName('li');
                if (index >= 0 && index < ingredientesSeleccionados.length) {
                    ingredientesSeleccionados[index].remove();
                    habilitarBotonesIngredientes();
                }
            });
        });
    }

    // Función para habilitar o deshabilitar los botones de agregar y eliminar ingredientes
    function habilitarBotonesIngredientes() {
        const ingredientesSeleccionados = divIngredientes.getElementsByTagName('li');
        if (ingredientesSeleccionados.length === 0) {
            btnEliminar.disabled = true;
        } else {
            btnEliminar.disabled = false;
        }
    }

    selectPlato.addEventListener('change', () => {
        const platoSeleccionado = selectPlato.value;
        if (platoSeleccionado) {
            const ingredients = platos[platoSeleccionado].ingredients;
            actualizarListaIngredientes(ingredients);
            habilitarBotonesIngredientes();
        }
    });

    btnEliminar.addEventListener('click', () => {
        const ingredientesSeleccionados = divIngredientes.getElementsByTagName('li');
        if (ingredientesSeleccionados.length > 0) {
            ingredientesSeleccionados[ingredientesSeleccionados.length - 1].remove();
            habilitarBotonesIngredientes();
        }
    });

    btnReset.addEventListener('click', () => {
        selectPlato.value = '';
        divIngredientes.innerHTML = '';
        btnEliminar.disabled = true;
    });

    function mostrarError() {
        divResultado.innerHTML = '';
        divResultado.innerHTML = '<p class="error">No se ha podido obtener la información nutricional. Por favor, inténtalo de nuevo más tarde.</p>';
    }


    btnCalcular.addEventListener('click', () => {
        const platoSeleccionado = selectPlato.value;
        if (platoSeleccionado) {
            const ingredients = divIngredientes.getElementsByTagName('li');
            let ingrString = Array.from(ingredients).map(ingrediente => ingrediente.textContent).join('\n');

            function convertirCadena(cadena) {
                // Eliminar "Eliminar" de la cadena ingrString
                cadena = cadena.replaceAll('Eliminar', '');

                // Separar los ingredientes por comas y agregar el número 1 antes de cada ingrediente
                const ingredientes = cadena.split(',').map(ingrediente => {
                    // Eliminar los espacios al principio y al final de cada ingrediente
                    ingrediente = ingrediente.trim();
                    // Devolver el ingrediente sin agregar "1"
                    return ingrediente;
                }).join(', ');

                return ingredientes;
            }

            divResultado.innerHTML = ''; // borra el contenido previo de la tabla de resultados

            // Llamada a la API de Edamam para obtener la información nutricional
            fetch(`https://api.edamam.com/api/nutrition-data?app_id=91e086d1&app_key=5b11d57af4564fbe1d68749947458c08&ingr=${encodeURIComponent(convertirCadena(ingrString))}`)
                .then(response => response.json())
                .then(data => {
                    // Obtenemos los nutrientes del objeto data
                    const nutrientes = data.totalNutrients;

                    // Creamos un objeto con los nutrientes que nos interesan
                    const nutrientesMostrar = {
                        'Calorías': nutrientes.ENERC_KCAL,
                        'Grasas': nutrientes.FAT,
                        'Grasas saturadas': nutrientes.FASAT,
                        'Carbohidratos': nutrientes.CHOCDF,
                        'Azúcares': nutrientes.SUGAR,
                        'Proteínas': nutrientes.PROCNT,
                        'Fibra': nutrientes.FIBTG,
                        'Sodio': nutrientes.NA
                    };

                    // Creamos una tabla para mostrar los nutrientes
                    const tablaNutrientes = document.createElement('table');
                    tablaNutrientes.innerHTML = `
      <thead>
        <tr>
          <th>Nutriente</th>
          <th>Cantidad</th>
          <th>Unidad</th>
        </tr>
      </thead>
      <tbody>
        ${Object.keys(nutrientesMostrar).map(nutriente => `
          <tr>
            <td>${nutriente}</td>
            <td>${nutrientesMostrar[nutriente].quantity.toFixed(2)}</td>
            <td>${nutrientesMostrar[nutriente].unit}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

                    // Añadimos la tabla al documento
                    let taules = document.getElementsByTagName('table')
                    if (taules.length > 0 ) {
                        taules[0].remove();
                    }
                    document.body.appendChild(tablaNutrientes);
                })
                .catch(error => {
                    console.error(error);
                    mostrarError();
                });



        } else {
            divResultado.innerHTML = '<p class="error">Por favor, selecciona un plato antes de calcular la información nutricional.</p>';
        }
    });
});

