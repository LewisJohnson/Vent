$( document ).ready(function() {
    var postForm = $('#new-post-form');
    var postFormFeelingList = $('#new-post-feeling-list');
    var postFormSubmitButton = $('#submit-post-button');
    var showNewPostFormButton = $('#show-new-post-form');

    // Shows new vent panel
    showNewPostFormButton.on( "click", function() {
        postForm.addClass('active');
        $(this).addClass('hidden');
        $(window).scrollTop( 100 );
    });

    $('#cancel-new-post').on( "click", function() {
        postForm.removeClass('active');
        showNewPostFormButton.removeClass('hidden');
    });

    //Changes feeling input value
    postFormFeelingList.find('button').on( "click", function() {
        var buttonFeelingListItem = $(this).parent();
        $('#new-post-feeling').val($(this).val());

        //Remove previous accent border
        postFormSubmitButton.removeClass (function (index, className) {
            return (className.match (/accent-border-bottom-[a-z]*/g) || []).join(' ');
        });

        //Add accent border
        postFormSubmitButton.addClass("accent-border-bottom-" + $(this).val());

        //Iterate over post feelings
        $('li', postFormFeelingList).each(function () {
            //Clear clas list
            this.className = "";

            //If not selected index
            if($(this).index() !== buttonFeelingListItem.index()) {
                if ($(this).index() === buttonFeelingListItem.next().index()
                    || $(this).index() === buttonFeelingListItem.prev().index()) {
                    $(this).addClass('close');
                } else {
                    $(this).addClass('far');
                }
            }
        });

        $(this).parent().addClass('selected');
    });

    // Vent post submit
    postForm.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url:'/public_html/app/php/new-post.php',
            type:'POST',
            data: postForm.serialize(),
            success:function(result){
                if(result === "Success"){
                    $('#cancel-new-post').click();
                    showNewPostFormButton.prop( "disabled", true );
                    showNewPostFormButton.val("Vented.");
                } else {
                    $('#new-post-form-response').text(result);
                }
            },
            error:function(xhr,status,error){
                alert("error" + status + error);
            }
        });
    });

});
