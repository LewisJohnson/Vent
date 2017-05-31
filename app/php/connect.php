<?php

$servername = "mysql.student.sussex.ac.uk:3306";
$username = "lj234";
$password = "Orange489";
$dbname = "lj234";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
