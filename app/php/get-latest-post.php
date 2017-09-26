<?php
require 'connect.php';

$sql = "SELECT * FROM vent.vent_post ORDER BY PostID DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        require_once('vent-post-helpers.php');
        createVentPostHtml($row["Feeling"], $row["Title"], $row["Content"], $row["Author"], $row["PostID"], timeElapsedString($row["CreationTime"]), $row["AllowComments"], $conn);
    }
}

$conn->close();