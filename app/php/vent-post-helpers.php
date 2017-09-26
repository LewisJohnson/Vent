<?php
require 'connect.php';
$ventPostIdRegex = "/(#)([0-9]+)\b/";

function createVentPostHtml($feeling, $title, $content, $author, $postID, $postCreationTime, $allowComments, $conn) {
    global $ventPostIdRegex;
	$postCreationTime = timeElapsedString($postCreationTime);
    $comments = null;

	if($allowComments) {
        $sql = "SELECT * FROM vent.vent_comment WHERE ParentID = $postID ORDER BY CommentID DESC LIMIT 10";
        if (empty($postID)) {
            return;
        }
        $comments = $conn->query($sql);
    }

    // Replace #xxx with anchor tags
    $content = preg_replace($ventPostIdRegex, "<a class='vent-post-anchor-link' title='Vent Post #$2' href='#ventpost$2'>$1$2</a>", $content);

    echo "
	<section class='vent-post-container accent-border-bottom-{$feeling}' id='ventpost{$postID}' data-postId='{$postID}' data-postFeeling='{$feeling}'>
		<div class='vent-post'>
			<div class='vent-post-content'>
				<h1 class='vent-post-author'>{$title}</h1>
				<h1 class='vent-post-id'>#{$postID}</h1>
                <p style='white-space:pre-wrap;'>{$content}</p>
             </div>";
            if ($comments != null && $comments->num_rows > 0) {
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
                <li class='author author-desktop'>Vented by {$author} around {$postCreationTime}</li>
                <li class='author author-mobile'>{$author} ~ {$postCreationTime}</li>
                <button class='vent-post-report-button' data-postId='{$postID}'>Report</button>";
            if($allowComments) {
                echo "<button class='vent-post-comment-button' data-postId='{$postID}'>Comment</button>";
            }
            echo"
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

function postIdRegexMatcheIterator($str)
{
    $offset = 0;
    while ( preg_match('/#[0-9]*/', $str, $m, PREG_OFFSET_CAPTURE, $offset)) {
        $offset = $m[0][1] + strlen($m[0][0]);
        yield $m[0][0];
    }
}