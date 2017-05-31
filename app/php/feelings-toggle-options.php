<li class="nav-dropdown">
    <h3>FILTER</h3>
    <h3 class="dropdown-arrow"></h3>
    <ul class="expando unstyled-list">
        <?php
        include 'feelings.php';

        foreach ($feelings as $count => $feelings_array)
        {
            $heading = $feelings_array[1]." ".ucfirst($feelings_array[0]);
            echo "<li>
                    <h4>{$heading}</h4>
                    <label class='switch'>
                    <input class='feeling-filter' type='checkbox' value='{$feelings_array[0]}'>
                    <div class='slider round'></div>
                    </label>
                </li>";
        }
?>
    </ul>
</li>