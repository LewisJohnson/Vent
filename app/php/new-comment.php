<?php
require 'connect.php';

$sql = "INSERT INTO lj234.vent_comment (ParentID, Content, Author, Feeling, CreationTime) VALUES (?,?,?,?, NOW())";

$stmt = $conn->prepare($sql);


if (empty($_POST["content"])) {
    echo "You need a message.";
    return;
}

if (!isset($_POST['feeling'])) {
    echo "Tell us how you're feeling.";
    return;
}

$stmt->bind_param("ssss", $_POST['parentID'], $_POST['content'], $_POST['author'], $_POST['feeling']);

$stmt->execute();

echo "Success";

$conn->close();
