var url = "https://dades.eicub.net/api/1/museusexposicions-visitants";
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        var data = JSON.parse(this.responseText);
        console.log(data); // Imprime los datos en la consola

        var tbody = document.querySelector("table tbody");

        data.forEach(function (item) {
            var row = document.createElement("tr");

            var añoCell = document.createElement("td");
            añoCell.textContent = item.Any;
            row.appendChild(añoCell);

            var ambitoCell = document.createElement("td");
            ambitoCell.textContent = item.Ambit;
            row.appendChild(ambitoCell);

            var titularidadCell = document.createElement("td");
            titularidadCell.textContent = item.Titularitat;
            row.appendChild(titularidadCell);

            var entidadCell = document.createElement("td");
            entidadCell.textContent = item.Entitat;
            row.appendChild(entidadCell);

            var tipoEquipamientoCell = document.createElement("td");
            tipoEquipamientoCell.textContent = item.TipusEquipament;
            row.appendChild(tipoEquipamientoCell);

            var usosFuncionalesCell = document.createElement("td");
            usosFuncionalesCell.textContent = item.UsosFuncionals;
            row.appendChild(usosFuncionalesCell);

            var equipamientoCell = document.createElement("td");
            equipamientoCell.textContent = item.Equipament;
            row.appendChild(equipamientoCell);

            var distritoCell = document.createElement("td");
            distritoCell.textContent = item.Districte;
            row.appendChild(distritoCell);

            var latitudCell = document.createElement("td");
            latitudCell.textContent = item.Latitud;
            row.appendChild(latitudCell);

            var longitudCell = document.createElement("td");
            longitudCell.textContent = item.Longitud;
            row.appendChild(longitudCell);

            var webCell = document.createElement("td");
            webCell.innerHTML = `<a href="${item.Web}" target="_blank">${item.Web}</a>`;
            row.appendChild(webCell);

            var visitantesCell = document.createElement("td");
            visitantesCell.textContent = item.Visitants;
            row.appendChild(visitantesCell);

            var notaCell = document.createElement("td");
            notaCell.textContent = item.Nota;
            row.appendChild(notaCell);

            tbody.appendChild(row);
        });
    }
});

xhr.open("GET", url);
xhr.send();