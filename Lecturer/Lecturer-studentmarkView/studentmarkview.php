<?php

// Check how someone access the php file, if it's not POST method, Acces will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to access
            case 'loadContent':
                loadContent();
                break;
               case 'addRequest':
                addRequest();
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

// When access is denied this will called to block the access
function accessDenied(){
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}




// Load Content
function loadContent()
{
     
$index=$_POST['index'];
$course=$_POST['course'];
$batch=$_POST['batch'];

include '../../DataBase.php';
$databaseconnection = getDbConnection();
if($databaseconnection == null){
$response=array("status"=>"failed","message"=>"Database connection failed");
echo json_encode($response);
}
else{

    $sql = "SELECT 
    S_ID,
    S_Name,
    T_ID,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID =student.S_ID) AS inmark,
    (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS docmark,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID = student.S_ID) + (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS Tot
FROM 
    student 
WHERE 
S_Index = '$index' AND Course = '$course' AND Batch = '$batch'";
$result = mysqli_query($databaseconnection, $sql);

if (mysqli_num_rows($result) > 0) {
$row = mysqli_fetch_assoc($result);
// $TeamID = $row['T_ID'];
// $inmark = $row['inmark'];
// $docmark = $row['docmark'];

echo json_encode($row);
}
else{
$response=array("status"=>"failed","message"=>"No data found");
}



}


}












