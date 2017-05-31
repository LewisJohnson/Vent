$( document ).ready(function() {

});

// Dropdown listener
$(document).on('click', '.dropdown-arrow', function (e) {
    e.preventDefault();
    $(this).next('.expando').toggleClass("active");
    $(this).toggleClass("active");
});

