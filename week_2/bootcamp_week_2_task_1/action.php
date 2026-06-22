<?php

foreach ($_POST as $i) {
    echo password_hash($i, PASSWORD_DEFAULT), "<br>";
}

echo "Your inputs have been securely stored!";