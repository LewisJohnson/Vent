$(document).on('click', '.vent-post-comment-button', function (e) {
    $('#comment-form').toggleClass("active");
    $('#new-comment-parent-id').val($(this).data("postid"));

    $('section',$("#posts")).each(function () {

        $(this).hide();
    });
});

$( document ).ready(function() {
    var commentForm = $('#comment-form');
    var commentFormFeelingList = $('#new-comment-feeling-list');
    var commentFormSubmitButton = $('#submit-comment-button');

    $('#cancel-new-comment').on( "click", function() {
        commentForm.removeClass('active');
    });

    //Changes feeling input value
    commentFormFeelingList.find('button').on( "click", function() {

        var buttonFeelingListItem = $(this).parent();

        $('#new-comment-feeling').val($(this).val());

        //Remove previous accent border
        commentFormSubmitButton.removeClass (function (index, className) {
            return (className.match (/accent-border-bottom-[a-z]*/g) || []).join(' ');
        });

        //Add accent border
        commentFormSubmitButton.addClass("accent-border-bottom-" + $(this).val());

        //Iterate over post feelings
        $('li', commentFormFeelingList).each(function () {
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

    //Vent post submit
    commentForm.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url:'/public_html/php/new-comment.php',
            type:'POST',
            data: commentForm.serialize(),
            success:function(result){
                if(result === "Success"){
                    $('#cancel-new-post').click();
                    commentForm.removeClass('active');
                    // getLatestPost();
                } else {
                    $('#new-comment-form-response').text(result);
                }
            },
            error:function(xhr,status,error){
                alert("error" + status + error);
            }
        });
    });
});

//
// function getLatestPost(){
//     $.ajax({
//         url:'/public_html/php/get-latest-post.php',
//         type:'GET',
//         success:function(result){
//             $('#posts').prepend(result);
//         }
//     });
// }