var xhr = new XMLHttpRequest();

function buscarPokemon(nombre) {
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            var nombre = data.name;
            var imagen = data.sprites.front_default;
            var tipos = data.types.map(function(tipo) {
                return tipo.type.name;
            }).join(', ');
            var habilidades = data.abilities.map(function(habilidad) {
                return habilidad.ability.name;
            }).join(', ');
            var html = '<tr><td>' + nombre + '</td><td><img src="' + imagen + '"></td><td>' + tipos + '</td><td>' + habilidades + '</td></tr>';
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