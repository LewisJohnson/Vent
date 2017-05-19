$( document ).ready(function() {
    //Change header on scolll
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 50) {
            $('header').css("height", "28vh");
            $('.large-header-title').addClass('large-header-title-menu');
            $('.large-header-container').addClass('large-header-container-as-menu');
        } else {
            $('header').css("height", "54vh");
            $('.large-header-title').removeClass('large-header-title-menu');
            $('.large-header-container').removeClass('large-header-container-as-menu');
        }
    });
});
