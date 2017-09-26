$( document ).ready(function() {
    var hamburger = $(".header-hamburger ul");
    var nav = $("nav");
    var feelingFilter = $(".feeling-filter");
    var headerIsMenu = false;

    var feelingFilterAsArray = function () {
        var f = {};
        feelingFilter.each(function() {
            f[$(this).val()] = $(this).is(':checked');
        });
        return f;
    };


    updateFeelingFilterFromCookie();
    checkallCookies();
    loadPosts();

    //Change header on scolll
    $(document).scroll(function() {
        if(headerIsMenu){
            return;
        }
        var y = $(this).scrollTop();
        if (y > 50) {
            headerIsMenu = true;
            $('header').css("height", "9rem");
            $('.header-hamburger').addClass('header-hamburger-as-menu');
            $('.large-header-container').addClass('large-header-container-as-menu');

            // If there is a subheader, add VENT branding
            if($(".large-header-subtitle").length > 0) {
                $('.large-header-title').addClass('large-header-title-branded');
            }
        }
    });

    hamburger.on("click", function() {
        var top = hamburger.children().eq(0);
        var middle = hamburger.children().eq(1);
        var bottom = hamburger.children().eq(2);

        if(nav.css("max-width") === "300px"){
            //Close menus
            $(".dropdown-arrow").each(function() {
                if($(this).hasClass("active")){
                    $(this).click();
                }
            });

            nav.css("max-width", "0px");
            top.css({"top": "0px", "width": "20px", "transform": "rotate(0deg)"});
            middle.css({"left": "0px", "opacity": "1"});
            bottom.css({"top": "0px", "width": "20px", "transform": "rotate(0deg)"});

            if (!headerIsMenu){
                $('.header-hamburger').removeClass('header-hamburger-as-menu');
            }

        } else {
            nav.css("max-width", "300px");
            $('.header-hamburger').addClass('header-hamburger-as-menu');
            top.css({"top": "8px", "width": "22px", "transform": "rotate(45deg)"});
            middle.css({"left": "8px", "opacity": "0"});
            bottom.css({"top": "-8px", "width": "22px", "transform": "rotate(-45deg)"});
        }
    });

    feelingFilter.on("change", function () {
        //Update vent filter cookie
        updateFeelingFilterCookie();

        //Update vent posts
        updateVentPosts();
    });

    function updateVentPosts(){
        // Visual only, Hides post which don't fit with the filter
        $('section', $("#posts")).each(function () {
            if(feelingFilterAsArray()[$(this).data("postfeeling")] === false){
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

    function updateFeelingFilterCookie(){
        setCookie("ventFilters", JSON.stringify(feelingFilterAsArray()), 365);
    }

    function updateFeelingFilterFromCookie(){
        if(getCookie("ventFilters") === ""){
            updateFeelingFilterCookie();
        }

        var pref = $.parseJSON(getCookie("ventFilters"));
        feelingFilter.each(function(index, item) {
            for (var key in pref) {
                if (pref.hasOwnProperty(key)) {
                    if(item.value === key) {
                        $(item).prop('checked', pref[key]);
                    }
                }
            }
        });
    }

    function loadPosts(){
        var posts = $('#posts');
        $.ajax({
            url:'/public_html/php/get-initial-vent-posts.php',
            type:'GET',
            success:function(result){
                posts.empty();
                posts.prepend(result);
                updateVentPosts();
            }
        });
    }

});