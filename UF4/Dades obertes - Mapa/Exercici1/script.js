const url = 'https://dades.eicub.net/api/1/museusexposicions-visitants';

fetch(`${url}`)
    .then(response => response.json())
    .then(data => {
        // aquí podeu fer el que vulgueu amb les dades
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });