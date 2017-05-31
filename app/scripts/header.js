$( document ).ready(function() {
    var hamburger = $(".header-hamburger ul");
    var nav = $("nav");
    var feelingFilter = $(".feeling-filter");

    var feelingList = {};
    updateFeelingPreferences();
    checkallCookies(JSON.stringify(feelingList));

    updateFeelingListFromCookie();
    updateFeelingPreferences();

    loadPosts();

    //Change header on scolll
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 50) {
            $('header').css("height", "9rem");
            $('.header-hamburger').addClass('header-hamburger-as-menu');
            $('.large-header-container').addClass('large-header-container-as-menu');

            // If there is a subheader, add VENT branding
            if($(".large-header-subtitle").length > 0) {
                $('.large-header-title').addClass('large-header-title-branded');
            }
        } else {
            if($(".large-header-subtitle").length <= 0) {
                $('header').css("height", "25rem");
                $('.large-header-container').removeClass('large-header-container-as-menu');
                $('.header-hamburger').removeClass('header-hamburger-as-menu');
                $('.large-header-title').removeClass('large-header-title-branded');
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

            if ($(document).scrollTop() < 50){
                if($(".large-header-subtitle").length < 1){
                    $('.header-hamburger').removeClass('header-hamburger-as-menu');
                }
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
        updatePostsFromPreferences();
    });

    function updatePostsFromPreferences(){
        updateFeelingPreferences();
        setCookie("ventFilters", JSON.stringify(feelingList), 365);

        $('section', $("#posts")).each(function () {
            if(feelingList[$(this).data("postfeeling")] === false){
                $(this).hide();
            } else {
                if($(this).css("display") === "none")
                    $(this).show();
            }
        });
    }

    function updateFeelingListFromCookie(){
        if(getCookie("ventFilters") === ""){
            return;
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

    function updateFeelingPreferences(){
        feelingFilter.each(function() {
            feelingList[$(this).val()] = this.checked;
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
                updatePostsFromPreferences();
            }
        });
    }

});