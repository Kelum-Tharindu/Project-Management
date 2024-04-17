<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'validateLogin':
                validateLogin($_POST['email'], $_POST['password']);
                break;
                case 'Singup':
                    Singup($_POST['email'], $_POST['password'],$_POST['username'],$_POST['batch'],$_POST['course'],$_POST['indexnumber']);
                    break;
            default:
                accessDenied();
        }
    } else {
        accessDenied();
    }
} else {
    accessDenied();
}
function accessDenied()
{
    http_response_code(403);
    exit('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}





// ---------------------------------------------------Student Singup---------------------------------------------------

function Singup($email, $password,$username,$batch,$course,$indexnumber){ // check for the login credentials in database
    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
    if($databaseconnection == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
    
        $sql = "INSERT INTO student (S_Email, S_PW, S_Name, S_Batch, S_Course, S_Index) VALUES ('$email', '$password', '$username', '$batch', '$course', '$indexnumber')";
        $result = mysqli_query(getDbConnection(), $sql);
    
        if($result){
            echo json_encode(array("status" => "success"));
        }
        else{
            echo json_encode(array("status" => "failed","message"=>"Query Error but Database connectted "));
        }
    }
    }
    
    

























// ---------------------------------------------------logging in the student---------------------------------------------------







function validateLogin($email, $password){ // check for the login credentials in database
include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
else{

    $sql = "SELECT * FROM student WHERE S_Email = '$email' AND S_PW = '$password'";
    $result = mysqli_query(getDbConnection(), $sql);
    
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_array($result);
        setcookie("S_ID", $row['S_ID'], time() + (86400 * 30), "/");
        setcookie("Name", $row['S_Name'], time() + (86400 * 30), "/");
    
        $TEAMID = $row['T_ID'];
    
        $sql1 = "SELECT * FROM team WHERE T_ID = '$TEAMID' ";
        $result1 = mysqli_query(getDbConnection(), $sql1);
    
        if(mysqli_num_rows($result1) > 0){
            $row1 = mysqli_fetch_array($result1);
            setcookie("T_ID", $row1['T_ID'], time() + (86400 * 30), "/");
            setcookie("L_ID", $row1['L_ID'], time() + (86400 * 30), "/");
            echo json_encode(array("status" => "success"));
        }
        else{
            echo json_encode(array("status" => "failed", "message" => "Query Error but Database connected"));
        }
    }
    else{
        echo json_encode(array("status" => "failed", "message" => "Query Error but Database connected"));
    }
    
}
}

?>