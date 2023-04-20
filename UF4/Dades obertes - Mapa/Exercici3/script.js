// Creamos la fuente de datos para los marcadores
var vectorSource = new ol.source.Vector();

// Creamos el mapa y agregamos la capa de marcadores
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: vectorSource
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([2.1833, 41.3833]),
        zoom: 12
    })
});

// Obtenemos los datos del API
var url = "https://dades.eicub.net/api/1/museusexposicions-visitants";
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        var data = JSON.parse(this.responseText);

        // Iteramos sobre los datos para crear los marcadores
        data.forEach(function (item) {
            // Obtenemos las coordenadas del punto
            var coordinates = ol.proj.fromLonLat([parseFloat(item.Longitud), parseFloat(item.Latitud)]);

            // Creamos un marcador con una imagen personalizada
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(coordinates)
            });

            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    // Se puede cambiar la url por otra de otro icono.
                    src: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23FF0000&text=%20&icon=fa-camera&hoffset=1'
                })
            }));

            // Creamos el contenido del popup con los datos de la entidad
            var popupContent = '<table><tr><th>Entidad</th><td>' + item.Entitat + '</td></tr>' +
                '<tr><th>Tipo de equipamiento</th><td>' + item.TipusEquipament + '</td></tr>' +
                '<tr><th>Sitio web</th><td><a href="' + item.AdrecaWeb + '">' + item.AdrecaWeb + '</a></td></tr>' +
                '<tr><th>Visitantes</th><td>' + item.Visitants + '</td></tr></table>';

            // Creamos el popup
            var popup = new ol.Overlay({
                element: document.createElement('div'),
                positioning: 'bottom-center',
                offset: [0, -30]
            });

            // Agregamos el contenido del popup al elemento del popup
            popup.getElement().innerHTML = popupContent;

            // Agregamos el evento 'click' al marcador para mostrar el popup
            marker.on('click', function (evt) {
                // Mostramos el popup en el mapa
                popup.setPosition(coordinates);
                map.addOverlay(popup);
            });

            // Agregamos el marcador a la fuente de datos
            vectorSource.addFeature(marker);
        });
    }
});

// Enviamos la petición al API
xhr.open("GET", url);
xhr.send();
