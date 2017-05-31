<?php
//$inputs = $_POST['feelings_toggle'];
foreach ($_POST as $key => $value)
    echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";
