<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to be accessed
            case 'submit':
                // Call the submit function
                echo"submit";
                submit($_FILES['file']);
                break;
            default:
                accessDenied();
        }
    }
    else
    {
        accessDenied();
    }   
     
}
else{
    accessDenied();
}

// When access is denied, this will be called to block the access
function accessDenied(){
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}

// Function to handle file submission
function submit($file){
    // Check if the file has been uploaded
    if(isset($file)){
        // Get the temporary file path
        $tmpFilePath = $file['tmp_name'];
        
        // Check if the file exists
        if($tmpFilePath != ""){
            // Read the file content
            $fileContent = file_get_contents($tmpFilePath);
            
            // Create a database connection
            $con = getDbConnection();
            
            // Escape the file content to prevent SQL injection
            $escapedFileContent = mysqli_real_escape_string($con, $fileContent);
            
            // Perform the SQL insert operation
            $sql = "INSERT INTO files (filecontent) VALUES ('$escapedFileContent')";
            $result = mysqli_query($con, $sql);
            
            // Check if the query was successful
            if($result){
                echo "File uploaded successfully";
            }
            else{
                echo "Failed to upload file";
            }
            
            // Close the database connection
            mysqli_close($con);
        }
        else{
            echo "Failed to upload file: No file uploaded";
        }
    }
    else{
        echo "Failed to upload file: File data not found";
    }
}

// Function to get the database connection
function getDbConnection(){
    $db_host = "localhost";
    $db_user = "root";
    $db_password = "";
    $database = "watchstore";
    $con = mysqli_connect($db_host, $db_user, $db_password, $database);
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $con;
}
?>
