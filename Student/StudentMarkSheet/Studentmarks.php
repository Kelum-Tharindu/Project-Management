<?php



// Check how someone access the php file, if it's not POST method, Acces will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to access
            case 'loadTeam':
                getStudentMarks();
                break;
                case 'loadindividual':
                getStudentindividualMarks();
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










function getStudentMarks()
{
    // $S_ID=$_COOKIE['S_ID'];
    //$T_ID=$_COOKIE['T_ID'];
    $T_ID=1;

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
    $sql = "SELECT d.*, vs.*
    FROM doc AS d
    JOIN viva_submission AS vs ON d.V_ID = vs.V_ID
    WHERE d.T_ID = '$T_ID';";
    
    $result = mysqli_query(getDbConnection(), $sql);
    $team_data = array();

    while($row = mysqli_fetch_array($result)){
        $team_data[] = $row; 
    }

    mysqli_close(getDbConnection()); //Close the database connection

    header('Content-Type: application/json');
    $json_data = json_encode($team_data);
    echo $json_data;

}




// ---------------------------------------------------------------getStudent individual Marks()---------------------------------------------------------------

function getStudentindividualMarks()
{
  
    //$T_ID=$_COOKIE['T_ID'];
    $S_ID=1;
   

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
    $sql = "SELECT vs.*, v.*
    FROM viva_student AS vs
    JOIN viva_submission AS v ON vs.V_ID = v.V_ID
    WHERE vs.S_ID = '$S_ID'";
    
    $result = mysqli_query(getDbConnection(), $sql);
    $team_data = array();

    while($row = mysqli_fetch_array($result)){
        $team_data[] = $row; 
    }

    mysqli_close(getDbConnection()); //Close the database connection

    header('Content-Type: application/json');
    $json_data = json_encode($team_data);
    echo $json_data;

}



?>