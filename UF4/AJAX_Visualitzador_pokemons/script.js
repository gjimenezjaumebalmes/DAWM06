var xhr = new XMLHttpRequest();

function buscarPokemon(nombre) {
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            var nombre = data.name;
            var imagen = data.sprites.front_default;
            var imagen_art = data.sprites.other["official-artwork"].front_default;
            var imagen_back = data.sprites.back_default;
            var imagen_shinny = data.sprites.front_shiny;
            var imagen_shinny_back = data.sprites.back_shiny;
            var tipos = data.types.map(function(tipo) {
                return tipo.type.name;
            }).join(', ');
            var habilidades = data.abilities.map(function(habilidad) {
                return habilidad.ability.name;
            }).join(', ');

            var html = '<tr><td>' + nombre + '</td><td>' +
                '<img width="200" height="200" src="' + imagen_art + '"></td><td>' +
                '<img src="' + imagen + '"></td><td>' +
                '<img src="' + imagen_back + '"></td><td>' +
                '<img src="' + imagen_shinny + '"></td><td>' +
                '<img src="' + imagen_shinny_back + '"></td>' +
                '</td><td>' + tipos + '</td>' +
                '<td>' + habilidades + '</td></tr>';
            document.getElementById('resultado').innerHTML = html;
        }
    };
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + nombre.toLowerCase());
    xhr.send();
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var pokemon = document.getElementById('pokemon').value;
    buscarPokemon(pokemon);
});