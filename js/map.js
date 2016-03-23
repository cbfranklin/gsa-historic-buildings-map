var historicPreservationMap;
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY29ubm9yM2VwIiwiYSI6ImNpbTU4YXNxOTAxbGJ1am0zazFvaWdteXkifQ.80poTj-_kKTVI5fELbD5YA';
    //([coords for map center], zoom-level])
    historicPreservationMap = L.mapbox.map('historicPreservationMap', 'mapbox.streets').setView([38.893106, -77.032891], 14);

    // Disable drag and zoom handlers.
    /*map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();*/

    // Disable tap handler, if present.
    //if (map.tap) map.tap.disable();

    //json call to geoJSON objects where loc is array of coordinates [lat,lng]
    //$.getJSON(req, function(data) {
    //console.log(data)
    for (i in points) {
        var latlng = [points[i].latitude, points[i].longitude];
        L.marker(latlng).addTo(historicPreservationMap);
    }
    //});
});