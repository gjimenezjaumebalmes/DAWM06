// Coordenadas límite de la ciudad de Barcelona
var lonMin = 1.6697;
var lonMax = 2.2330;
var latMin = 41.2969;
var latMax = 41.4680;

// Generar coordenadas aleatorias dentro de los límites de la ciudad de Barcelona
var lat = Math.random() * (latMax - latMin) + latMin;
var lon = Math.random() * (lonMax - lonMin) + lonMin;

// Crear la fuente del marcador
var markerSource = new ol.source.Vector({
    features: [
        new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
        })
    ]
});

// Crear el estilo del marcador
var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
        src: 'https://openlayers.org/en/v6.5.0/examples/data/icon.png'
    })
});

// Crear la capa del marcador
var markerLayer = new ol.layer.Vector({
    source: markerSource,
    style: markerStyle
});

// Crear el mapa
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        markerLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: 13
    })
});

// Crear overlay y popup para mostrar información del marcador
var overlay = new ol.Overlay({
    element: document.getElementById('popup-container'),
    autoPan: true,
    autoPanAnimation: { duration: 250 }
});
map.addOverlay(overlay);
var popupContent = document.getElementById('popup-content');

// Agregar evento de clic al marcador
markerLayer.getSource().on('click', function (evt) {
    var coordinate = evt.coordinate;
    var content = '<p>Latitud: ' + coordinate[1] + '</p>' +
        '<p>Longitud: ' + coordinate[0] + '</p>';
    // Mostrar popup con la información
    overlay.setPosition(coordinate);
    popupContent.innerHTML = content;
    overlay.setOffset([0, -22]);
});
