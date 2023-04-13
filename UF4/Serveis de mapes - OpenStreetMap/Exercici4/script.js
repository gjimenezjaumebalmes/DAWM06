// Defineix el mapa
var map = new ol.Map({
    target: 'map', // Element on es mostrara el mapa
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Utilitza la capa OpenStreetMap com a font de dades
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([2.1734, 41.3851]), // Centra el mapa a Barcelona
        zoom: 12 // Estableix el nivell de zoom inicial
    })
});

// Agrega un event submit al formulari per crear un nou marcador
document.getElementById('marker-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var lat = parseFloat(document.getElementById('lat-input').value);
    var lon = parseFloat(document.getElementById('lon-input').value);
    var name = document.getElementById('name-input').value;
    addMarker(lat, lon, name);
});

// Funció per afegir un nou marcador
function addMarker(lat, lon, name) {
    // Crea una nova característica de tipus Point amb les coordenades i nom
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        name: name
    });

    // Crea la capa de marcador
    var markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'https://openlayers.org/en/v6.5.0/examples/data/icon.png' // Defineix una imatge pel marcador
            })
        })
    });

    // Agrega el nou marcador a la capa de marcadors
    markerLayer.getSource().addFeature(marker);

    // Mostrar el popup
    var coordinates = marker.getGeometry().getCoordinates();
    var popupContent = '<p>Nom: ' + name + '</p>' +
        '<p>Coordenades: ' + coordinates + '</p>';
    var popup = new ol.Overlay({
        element: document.getElementById('popup'),
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -25]
    });
    map.addOverlay(popup);
    popup.setPosition(coordinates);
    document.getElementById('popup-content').innerHTML = popupContent;

    // Agrega la capa de marcadors al mapa
    map.addLayer(markerLayer);
}
