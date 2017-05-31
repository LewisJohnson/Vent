<?php
require 'connect.php';
require 'vent-post-helpers.php';

$sql = "SELECT * FROM lj234.vent_post ORDER BY PostID DESC LIMIT 100";
$result = $conn->query($sql);

createAnnouncementVentPostHtml("You have post filters on.", "");

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		createVentPostHtml($row["Feeling"], $row["Title"], $row["Content"], $row["Author"], $row["PostID"], timeElapsedString($row["CreationTime"]), $conn);
	}
}

createAnnouncementVentPostHtml("You've reached the end.", "");

$conn->close();