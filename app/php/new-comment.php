<?php
require 'connect.php';

$sql = "INSERT INTO vent.vent_comment (ParentID, Content, Author, Feeling, CreationTime) VALUES (?,?,?,?, NOW())";

$stmt = $conn->prepare($sql);


if (empty($_POST["content"])) {
    echo "You need a message.";
    return;
}

if (!isset($_POST['feeling'])) {
    echo "Tell us how you're feeling.";
    return;
}

$stmt->bind_param("ssss", $_POST['parentID'], strip_tags($_POST['content']), strip_tags($_POST['author']), strip_tags($_POST['feeling']));

$stmt->execute();

echo "Success";

$conn->close();
