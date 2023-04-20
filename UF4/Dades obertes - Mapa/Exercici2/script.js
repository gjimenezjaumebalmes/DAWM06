// Obtenemos los datos del API
var url = "https://dades.eicub.net/api/1/museusexposicions-visitants";
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        var data = JSON.parse(this.responseText);

        // Creamos una capa de marcadores
        var vectorSource = new ol.source.Vector();

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

            // Agregamos el marcador a la capa de marcadores
            vectorSource.addFeature(marker);
        });

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
    }
});

xhr.open("GET", url);
xhr.send();