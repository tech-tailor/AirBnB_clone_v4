dy(function() {
    var checkedStates = {}; // Object to store checked states
    var checkedCities = {}; // Object to store checked cities

    // Function to make POST request to places_search endpoint with checked amenities, states, and cities
    function searchPlacesWithFilters(checkedAmenities) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: checkedAmenities,
                states: Object.keys(checkedStates),
                cities: Object.keys(checkedCities)
            }), // Pass checked amenities, states, and cities in the request body
            success: function(response) {
                // Clear existing places
                $('.places').empty();
                // Loop through each place in the response
                response.forEach(function(place) {
                    // Create article tag representing a Place in the section.places
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
    }

    // Event listener for button click
    $('#search-button').click(function() {
        var checkedAmenities = []; // Array to store checked amenities
        // Loop through each checked checkbox and store Amenity IDs in the array
        $('input[type="checkbox"]:checked').each(function() {
            checkedAmenities.push($(this).data('id'));
        });
        // Call function to search places with checked amenities, states, and cities
        searchPlacesWithFilters(checkedAmenities);
    });

    // Event listener for changes on input checkboxes for states
    $('.locations ul.states input[type="checkbox"]').change(function() {
        var stateId = $(this).data('id');
        var stateName = $(this).data('name');
        if ($(this).is(':checked')) {
            // Add checked state to the object
            checkedStates[stateId] = stateName;
        } else {
            // Remove unchecked state from the object
            delete checkedStates[stateId];
        }
        // Update h4 tag inside the div Locations with the list of States checked
        $('div.locations h4.states').text(Object.values(checkedStates).join(', '));
    });

    // Event listener for changes on input checkboxes for cities
    $('.locations ul.cities input[type="checkbox"]').change(function() {
        var cityId = $(this).data('id');
        var cityName = $(this).data('name');
        if ($(this).is(':checked')) {
            // Add checked city to the object
            checkedCities[cityId] = cityName;
        } else {
            // Remove unchecked city from the object
            delete checkedCities[cityId];
        }
        // Update h4 tag inside the div Locations with the list of Cities checked
        $('div.locations h4.cities').text(Object.values(checkedCities).join(', '));
    });
});
