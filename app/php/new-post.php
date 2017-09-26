<?php
require 'connect.php';

$sql = "INSERT INTO vent.vent_post (Title, Content, Author, Feeling, AllowComments, CreationTime) VALUES (?,?,?,?,?, NOW())";

$stmt = $conn->prepare($sql);

if (empty($_POST["title"])) {
    echo "You need a title.";
    return;
}

if (empty($_POST["content"])) {
    echo "You need a message.";
    return;
}

if (!isset($_POST['feeling'])) {
    echo "Tell us how you're feeling.";
    return;
}

// Don't allow HTML tags
preg_replace("/[<>]+/", '', $_POST["title"]);
preg_replace("/[<>]+/", '', $_POST["author"]);

$stmt->bind_param("sssss", $_POST['title'], htmlspecialchars($_POST['content']), $_POST['author'], $_POST['feeling'], $_POST['comments']);

$stmt->execute();

echo "Success";

$conn->close();
