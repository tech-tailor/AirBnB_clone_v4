dy(function() {
    $('input[type="checkbox"]').change(function() {
        var checkedAmenities = []; 
        $('input[type="checkbox"]:checked').each(function() {
            checkedAmenities.push($(this).data('id'));
        });
        $('div.amenities h4').text(checkedAmenities.join(', '));
    });
});
