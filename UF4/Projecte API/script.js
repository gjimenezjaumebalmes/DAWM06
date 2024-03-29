    // Objeto para almacenar los valores de los nutrientes
    const valoresNutrientes = {
        'Grasas': 0,
        'Grasas saturadas': 0,
        'Carbohidratos': 0,
        'Azúcares': 0,
        'Proteínas': 0,
        'Fibra': 0,
        'Sodio': 0
    };

document.addEventListener('DOMContentLoaded', () => {
            const selectPlato = document.getElementById('plato');
            const btnCalcular = document.getElementById('calcular');
            const divResultado = document.getElementById('resultado');
            const divIngredientes = document.getElementById('ingredients');
            const btnEliminar = document.getElementById('eliminar');
            const btnReset = document.getElementById('reset');

            let platos = {};
            let nutrientes = {}; // Agregar la variable nutrientes en el alcance global

            // let nombreTabla = '';

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
                calcularNutrientes(nutrientes)
                btnCalcular.style.display = 'none';
            });

            function calcularNutrientes() {
                nutrientes = {}; // Crear objeto nutrientes vacío

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
                divIngredientes.style.display = 'none';
                selectPlato.disabled = true;

            }

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
                location.reload(); // Agregamos la función para refrescar la página
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

                // Separar los ingredientes por comas en un array y agregar el número 1 antes de cada ingrediente
                const ingredientesArray = cadena.split(',').map(ingrediente => {
                    // Eliminar los espacios al principio y al final de cada ingrediente
                    ingrediente = ingrediente.trim();

                    // Agregar " g" después del valor numérico de ingrediente
                    const valorNumerico = ingrediente.match(/\d+(\.\d+)?/);

                    // Devolver el ingrediente sin agregar "1"
                    return ingrediente;
                });

                // Unir los ingredientes del array separados por coma y salto de línea
                const ingredientes = ingredientesArray.join(' AND ');

                return ingredientes;
            }

            divResultado.innerHTML = ''; // borra el contenido previo de la tabla de resultados

            // Llamada a la API de Edamam para obtener la información nutricional
            fetch(`https://api.edamam.com/api/nutrition-data?app_id=91e086d1&app_key=5b11d57af4564fbe1d68749947458c08&ingr=${encodeURIComponent(convertirCadena(ingrString))}`)
                .then(response => response.json())
                .then(data => {
                    // Obtenemos los nutrientes del objeto data
                    const nutrientes = data.totalNutrients;
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

                    // Almacenamos los valores de los nutrientes en el objeto valoresNutrientes
                    valoresNutrientes['Grasas'] = nutrientes.FAT.quantity.toFixed(2);
                    valoresNutrientes['Grasas saturadas'] = nutrientes.FASAT.quantity.toFixed(2);
                    valoresNutrientes['Carbohidratos'] = nutrientes.CHOCDF.quantity.toFixed(2);
                    valoresNutrientes['Azúcares'] = nutrientes.SUGAR.quantity.toFixed(2);
                    valoresNutrientes['Proteínas'] = nutrientes.PROCNT.quantity.toFixed(2);
                    valoresNutrientes['Fibra'] = nutrientes.FIBTG.quantity.toFixed(2);
                    valoresNutrientes['Sodio'] = (nutrientes.NA.quantity / 1000).toFixed(2);

                    let myChart = null;

                    const divGrafica = document.getElementById('grafica');


                    function crearGrafica(valoresNutrientes) {
                        // Declara la variable myChart antes de usarla
                        const canvas = document.getElementById('myChart');
                        if (!canvas) {
                            return; // No se puede crear el gráfico si el canvas no existe
                        }
                        // En el código que genera el gráfico, destruye el gráfico anterior antes de crear uno nuevo
                        if (myChart !== null) {
                            myChart.destroy();
                        }
                        const ctx = canvas.getContext('2d');
                        console.log(valoresNutrientes); // muestra los valores de los nutrientes

                        // Crea el nuevo gráfico
                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Grasas', 'Grasas saturadas', 'Carbohidratos', 'Azúcares', 'Proteínas', 'Fibra', 'Sodio'],
                                datasets: [{
                                    label: 'Cantidad',
                                    data: [valoresNutrientes['Grasas'], valoresNutrientes['Grasas saturadas'], valoresNutrientes['Carbohidratos'], valoresNutrientes['Azúcares'], valoresNutrientes['Proteínas'], valoresNutrientes['Fibra'], valoresNutrientes['Sodio']],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        min: 0,
                                        max: 200,
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    }

                    crearGrafica(valoresNutrientes);


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

