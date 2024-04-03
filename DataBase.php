<?php

// getDbConnection();
function getDbConnection(){
    $db_host = "localhost";
    $db_user = "root";
    $db_password = "";
    $database = "nibmaestro";
    $con = mysqli_connect($db_host, $db_user, $db_password, $database);
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
       // return null;
    }
    else{
        //echo "Connected successfully";
        return $con;
    }
}
                
