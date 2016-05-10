var historicPreservationMap;
var emptyRegEx = "^\\s+$";
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2NvdHR6YWNoZWsiLCJhIjoiY2ludDF6eDJxMTFmZnVrbTMwcGV5OWpqYSJ9.t4IyHjLn3Y_6dUQNk7H0og';
    historicPreservationMap = L.mapbox.map('historicPreservationMap', 'mapbox.streets');

    var tableTemplate = $('#templates .template-table').html();
    var tableContent = Mustache.render(tableTemplate, historicBuildingsData);
    $('#historicPreservationTable').html(tableContent)

    $('#historicPreservationTable table').addClass('stripe').DataTable({
        "info": false,
        "searching": false,
        "paging": false,
        "responsive": true,
        "scrollY": 300
    });

    historicPreservationMap.whenReady(function() {
        historicPreservationMap.setView([38.893106, -77.032891], 15);
        var markerLayer = L.mapbox.featureLayer().addTo(historicPreservationMap);

        // Disable drag and zoom handlers.
        /*historicPreservationMap.dragging.disable();
        historicPreservationMap.touchZoom.disable();
        historicPreservationMap.doubleClickZoom.disable();
        historicPreservationMap.scrollWheelZoom.disable();
        historicPreservationMap.keyboard.disable();*/

        for (i in historicBuildingsData) {
            var data = historicBuildingsData[i]
            var lat = data['Lat'];
            var lng = data['Lng']
            if (!lat.match(emptyRegEx) && lat !== NaN && lat !== '' && !lng.match(emptyRegEx) && lng !== NaN && lng !== '') {
                var latlng = [lat, lng];
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
            }
        }
        markerLayer.on('mouseover', function(e) {
            e.layer.openPopup();
        });
        /*markerLayer.on('mouseout', function(e) {
            e.layer.closePopup();
        });*/

        L.polygon(panhs, { color: '#fdcc03', opacity: .6 }).addTo(historicPreservationMap);
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

});
