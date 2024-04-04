<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to be accessed
            case 'submit':
                // Call the submit function
                
                submit();
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

function submit(){

if(isset($_FILES['input-file']))
{
    include '../../DataBase.php';
    $con = getDbConnection();
if($con == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
else{

            // $T_ID=$_COOKIE['T_ID'];
            $T_ID=1;

            // Get the file content
                $Doc = file_get_contents($_FILES['input-file']['tmp_name']);

            // Prepare the SQL statement to insert the image data
            $sql = "INSERT INTO Document (Doc,T_ID) VALUES (?, ?)";
            $stmt = $con->prepare($sql);
            echo $con->error;
            // Bind the file content to the SQL statement
            $null = NULL; // Placeholder for BLOB parameter
            $stmt->bind_param("bs", $null, $T_ID); // 'b' indicates binary data
            $stmt->send_long_data(0, $Doc); // Bind BLOB data 

            // Execute the SQL statement
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(array("status" => "success", "message" => "Profile Picture Updated Successfully"));
            } else {
                echo json_encode(array("status" => "failed", "message" => "Failed to Update Profile Picture"));
            }

            // Close the statement and connection
            $stmt->close();
            $con->close();
    } 
}
    else{
    echo json_encode(array("status" => "failed", "message" => "No Profile Picture Found"));
    }


}


























// // Function to handle file submission
// function submit($file){
//     // Check if the file has been uploaded
//     if(isset($file)){
//         // Get the temporary file path
//         $tmpFilePath = $file['tmp_name'];
        
//         // Check if the file exists
//         if($tmpFilePath != ""){
//             // Read the file content
//             $fileContent = file_get_contents($tmpFilePath);
            
//             // Create a database connection
//             $con = getDbConnection();
            
//             // Escape the file content to prevent SQL injection
//             $escapedFileContent = mysqli_real_escape_string($con, $fileContent);
            
//             // Perform the SQL insert operation
//             $sql = "INSERT INTO files (filecontent) VALUES ('$escapedFileContent')";
//             $result = mysqli_query($con, $sql);
//             // $result=true;
//             // $result=false;
//             // Check if the query was successful
//             if($result){
//                 echo json_encode(array("status" => "success"));
//             }
//             else{
//                 echo json_encode(array("status"=>"failed","message"=>"Query Error but Database connectted "));
              
//             }
            
//             // Close the database connection
//             mysqli_close($con);
//         }
//         else{
//             echo json_encode(array("status" => "failed", "message" => "File not found"));
//         }
//     }
//     else{
//         echo json_encode(array("status" => "failed","message"=>" Error but Database connectted "));
//     }
// }

// Function to get the database connection
// function getDbConnection(){
//     $db_host = "localhost";
//     $db_user = "root";
//     $db_password = "";
//     $database = "watchstore";
//     $con = mysqli_connect($db_host, $db_user, $db_password, $database);
//     if (!$con) {
//         die("Connection failed: " . mysqli_connect_error());
//     }
//     return $con;
// }
?>
