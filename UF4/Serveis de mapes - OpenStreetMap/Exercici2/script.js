// Coordenades aleatòries dins de l'àrea de la ciutat de Barcelona
var lat = 41.34 + Math.random() * 0.12; // Genera una latitud aleatòria entre 41.34 i 41.46 (coordenades límit de la ciutat)
var lon = 2.08 + Math.random() * 0.2; // Genera una longitud aleatòria entre 2.08 i 2.28 (coordenades límit de la ciutat)

// Crea la capa de marcador
var markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])) // Crea una nova característica de tipus Point amb les coordenades aleatòries
            })
        ]
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'https://openlayers.org/en/v6.5.0/examples/data/icon.png' // Defineix una imatge pel marcador
        })
    })
});


// Crea el mapa
var map = new ol.Map({
    target: 'map', // Indica el div on s'insertarà el mapa
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Afegeix una capa de tiles d'OpenStreetMap al mapa
        }),
        markerLayer // Afegeix la capa de marcador al mapa
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([2.1734, 41.3851]), // Centra el mapa a Barcelona
        zoom: 13 // Defineix el nivell de zoom inicial del mapa
    })
});
