// Crea el mapa
var map = new ol.Map({
    target: 'map', // Element on es mostrara el mapa
    layers: [
        // Capa de tiles de OpenStreetMap
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        // Coordenades del centre del mapa (Plaça de Catalunya)
        center: ol.proj.fromLonLat([2.1734, 41.3851]),
        zoom: 13 // Nivell de zoom inicial
    })
});