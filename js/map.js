var historicPreservationMap;
var emptyRegEx = "^\\s+$";
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY29ubm9yM2VwIiwiYSI6ImNpbTU4YXNxOTAxbGJ1am0zazFvaWdteXkifQ.80poTj-_kKTVI5fELbD5YA';
    //setView([coords for map center], zoom-level])
    historicPreservationMap = L.mapbox.map('historicPreservationMap', 'mapbox.streets').setView([38.893106, -77.032891], 15);
    var markerLayer = L.mapbox.featureLayer().addTo(historicPreservationMap);

    // Disable drag and zoom handlers.
    /*map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();*/

    for (i in historicBuildingsData) {
        var data = historicBuildingsData[i]
        var lat = data['Lat'];
        var lng = data['Lng']
        if (!lat.match(emptyRegEx) && lat !== NaN && lat !== '' && !lng.match(emptyRegEx) && lng !== NaN && lng !== '') {
            var latlng = [lat, lng];
            console.log('accepted', data['Building Name'], lat, lng)
            var popupTemplate = $('#templates .template-popup').html();
            var popupContent = Mustache.render(popupTemplate, data);
            var markerTemplate = $('#templates .template-marker').html();
            var markerContent = Mustache.render(markerTemplate, data);
            var icon = L.divIcon({
                iconSize: [30, 30],
                popupAnchor: [0, 25],
                //iconAnchor: [35, 10],
                className: 'historic-buildings-marker',
                html: markerContent
            })
            L.marker(latlng, {
                icon: icon,
            }).bindPopup(popupContent, {
                closeButton: false,
                minWidth: 280
            }).addTo(markerLayer);
        } else {
            console.log('rejected:', data['Building Name'])
        }
    }
    markerLayer.on('mouseover', function(e) {
        e.layer.openPopup();
    });



    //pennsylvania avenue national historic site
    var panhs = [
        [38.898724, -77.035087],
        [38.898758, -77.033634],
        [38.897351, -77.033645],
        [38.897355, -77.030641],
        [38.896123, -77.030636],
        [38.896127, -77.027015],
        [38.897346, -77.027020],
        [38.897338, -77.024000],
        [38.898453, -77.023973],
        [38.898455, -77.021918],
        [38.896133, -77.021931],
        [38.896133, -77.018938],
        [38.898323, -77.018922],
        [38.898325, -77.016178],
        [38.896125, -77.016188],
        [38.896135, -77.015166],
        [38.891528, -77.015182],
        [38.890793, -77.012462],
        [38.890745, -77.012143],
        [38.890568, -77.012124],
        [38.890484, -77.012371],
        [38.890666, -77.012631],
        [38.891472, -77.015579],
        [38.891681, -77.016019],
        [38.892289, -77.018500],
        [38.892051, -77.019321],
        [38.892090, -77.033668],
        [38.895513, -77.033653],
        [38.895467, -77.035117]
    ]
     L.polygon(panhs,{color:'yellow',opacity:.6}).addTo(historicPreservationMap);
});