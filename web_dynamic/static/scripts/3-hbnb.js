$(document).ready(function() {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(response) {
            response.forEach(function(place) {
                var article = $('<article>').appendTo('.places');
                $('<div>').addClass('title_box').appendTo(article).append($('<h2>').text(place.name));
                $('<div>').addClass('information').appendTo(article).append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '')),
                                                                                    $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '')),
                                                                                    $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '')));
                $('<div>').addClass('description').appendTo(article).text(place.description);
            });
        },
        error: function() {
            console.log('Error fetching places data');
        }
    });
});
