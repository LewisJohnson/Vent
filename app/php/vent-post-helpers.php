<?php
require 'connect.php';

function createVentPostHtml($feeling, $title, $content, $author, $postID, $postCreationTime, $conn) {
	$postCreationTime = timeElapsedString($postCreationTime);
    $sql = "SELECT * FROM lj234.vent_comment WHERE ParentID = $postID ORDER BY CommentID DESC LIMIT 100";

    if (empty($postID)) {return;}

    $comments = $conn->query($sql);


	echo "
	<section class='vent-post-container accent-border-bottom-{$feeling}' data-postId='{$postID}' data-postFeeling='{$feeling}'>
		<div class='vent-comment-post vent-text-post'>
			<div class='vent-post-content'>
				<h1 class='vent-post-author'>{$title}</h1>
				<h1 class='vent-post-id'>#{$postID}</h1>
                <p style='white-space:pre-wrap;'>{$content}</p>
             </div>";
            if ($comments->num_rows > 0) {
                echo "<div class='vent-comment-container dropdown'>";
                echo "<h3>Comments</h3>";
                echo "<h3 class='dropdown-arrow'></h3>";
                echo "<div class='expando'>";
                while($row = $comments->fetch_assoc()) {
                    createVentCommentHtml($row["Feeling"], $row["Author"], $row["Content"], $row["CreationTime"], $row["CommentID"]);
                }
                echo "</div>";
                echo "</div>";
            }
            echo "
             <ul class='vent-post-footer unstyled-list'>
                <li class='author-desktop' style='float: left'>Vented by {$author} around {$postCreationTime}</li>
                <li class='author-mobile' style='float: left'>{$author} ~ {$postCreationTime}</li>
                <a href='#' style='float: right'>Report</a>
                <button class='vent-post-comment-button' style='float: right' data-postId='{$postID}'>Comment</button>
			</ul>
		</div>
	</section>";
}

function createAnnouncementVentPostHtml($title, $content = "") {
    echo "
	<section class='vent-post-container accent-border-bottom-announcement'>
		<div class='vent-text-post'>
			<div class='vent-post-content'>";
    if($content == "") {
        echo "<h4 style='margin: 0;'>{$title}</h4>";
    } else {
        echo "<h4>{$title}</h4>";
    }
    if($content != ""){
        echo "<p style='white-space:pre-wrap;'>{$content}</p>";
    }

    echo"
             </div>
		</div>
	</section>";
}

function createVentCommentHtml($feeling, $author, $content, $commentCreationTime, $commentID) {
    $commentCreationTime = timeElapsedString($commentCreationTime);

    echo "
	<div class='vent-comment' data-commentId='{$commentID}' data-commentFeeling='{$feeling}'>
	    <h5 class='vent-comment-feeling-{$feeling}'>{$author}</h5>
	    <p class='vent-comment-content'>{$content}</p>
	    <p class='vent-comment-time'>{$commentCreationTime}</p>
	</div>";
}

function timeElapsedString($datetime, $full = false) {
    date_default_timezone_set('Europe/London');
	$now = new DateTime;
	$ago = new DateTime($datetime);
	$diff = $now->diff($ago);

	$diff->w = floor($diff->d / 7);
	$diff->d -= $diff->w * 7;

	$string = array(
		'y' => 'year',
		'm' => 'month',
		'w' => 'week',
		'd' => 'day',
		'h' => 'hour',
		'i' => 'minute',
		's' => 'second',
	);
	foreach ($string as $k => &$v) {
		if ($diff->$k) {
			$v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
		} else {
			unset($string[$k]);
		}
	}

	if (!$full) $string = array_slice($string, 0, 1);
	return $string ? implode(', ', $string) . ' ago' : 'just now';
}