<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {
        include '../../DbAccess.php';
        include 'genarateID.php';

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'updateProfilePic':
                updateProfilePic();
                break;
            case 'getUserData':
                getUserData();
                break;
            case 'updateUserData':
                updateUserData($_POST['data']);
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


function updateProfilePic()
{
    if (isset($_FILES['newProfile'])) {
        $con = getDbConnection();
        $cusid = $_COOKIE['cusid'];

        // Get the file content
        $profilePic = file_get_contents($_FILES['newProfile']['tmp_name']);

        // Update the existing profile picture if available else insert a new one
        $sql = "INSERT INTO customerreg_profile_pics (Profile, CusID) VALUES (?, ?) ON DUPLICATE KEY UPDATE Profile = VALUES(Profile)";
        $stmt = $con->prepare($sql);

        // Bind the file content to the SQL statement
        $null = NULL; // Placeholder for BLOB parameter
        $stmt->bind_param("bs", $null, $cusid); // 'b' indicates binary data
        $stmt->send_long_data(0, $profilePic); // Bind BLOB data separately

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
    } else {
        echo json_encode(array("status" => "failed", "message" => "No Profile Picture Found"));
    }
}

function getUserData() // Get the user data from the database
{
    $con = getDbConnection();
    $cusid = $_COOKIE['cusid']; // Get the user ID from the cookie

    $sql = "SELECT * FROM customerreg WHERE CusID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $cusid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) { // If user data found,
        $userData = $result->fetch_assoc(); // Fetch the user data to array

        // Get the interseted categories if available
        $sql = "SELECT CategoryID FROM customerreg_fave_categories WHERE CusID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $cusid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) { // If interested categories found,
            $categories = array();
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row['CategoryID']; // Add the category IDs to the array
            }
            $userData['categories'] = $categories;
        }

        echo json_encode(array("userData" => $userData));
    } else {
        echo json_encode(array("status" => "failed", "message" => "User Not Found"));
    }

    $stmt->close();
    $con->close();
}

function updateUserData($userData)
{
    $con = getDbConnection();
    $cusid = $_COOKIE['cusid'];

    $fields = array(); // array to store query parts
    $parameters = array(); // array to store parameters parts

    $msgArray = array(); // array to store the messages

    if (isset($userData['name'])) {
        $fields[] = "FullName = ?";
        $parameters[] = $userData['name'];
    }
    if (isset($userData['nic'])) {
        $fields[] = "NIC = ?";
        $parameters[] = $userData['nic'];
    }
    if (isset($userData['email'])) {
        $fields[] = "Email = ?";
        $parameters[] = $userData['email'];
    }
    if (isset($userData['psswdHash'])) {
        $fields[] = "Password = ?";
        $parameters[] = $userData['psswdHash'];
    }
    if (isset($userData['phone'])) {
        $fields[] = "Mobile = ?";
        $parameters[] = $userData['phone'];
    }
    if (isset($userData['sex'])) {
        $fields[] = "Sex = ?";
        $parameters[] = $userData['sex'];
    }
    if (isset($userData['dob'])) {
        $fields[] = "BirthDate = ?";
        $parameters[] = $userData['dob'];
    }
    if (isset($userData['address'])) {
        $fields[] = "Address = ?";
        $parameters[] = $userData['address'];
    }

    $parameters[] = $cusid;

    // If parameters have set, then Create the query and update the user data
    if (count($fields) > 0) {
        $sql = 'UPDATE customerreg SET ' . implode(', ', $fields) . ' WHERE CusID = ?';
        $stmt = $con->prepare($sql);
        $dataTypes = str_repeat("s", count($parameters)); // Repeat the 's'
        $stmt->bind_param($dataTypes, ...$parameters); // Bind the parameters
        $stmt->execute();

        // If User dataUpdate successful
        if ($stmt->affected_rows > 0) {
            // reset the cookies if the email is updated
            if (isset($userData['email'])) {
                setcookie("cusid", "", time() - 3600, "/");
                setcookie("cusid", $cusid, time() + (86400 * 30), "/");
                setcookie("email", "", time() - 3600, "/");
                setcookie("email", $userData['email'], time() + (86400 * 30), "/");
            }
            $msgArray[] = "User Data Updated Successfully";
        } else {
            echo json_encode(array("status" => "failed", "message" => "Failed to Update User Data"));
            exit();
        }
    }

    // If user have selected categories, then update the categories
    if (isset($userData['catIDList']) && $userData['catIDList'] != null) {
        $catIDList = $userData['catIDList'];

        // Delete all existing categories if exists
        $sql = "DELETE FROM customerreg_fave_categories WHERE CusID = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $cusid);
        $stmt->execute();

        foreach ($catIDList as $cat) {
            // Insert all selected categories to the customerreg_favcatList table
            $sql = "INSERT INTO customerreg_fave_categories (CusID, CategoryID) VALUES (?, ?);";

            $stmt = $con->prepare($sql);
            $stmt->bind_param("ss", $cusid, $cat);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
            } else {
                echo json_encode(array("status" => "failed", "message" => "Failed to Update User Categories"));
                exit();
            }
        }
        $msgArray[] = "User Categories Updated Successfully";
    }

    echo json_encode(array("status" => "success", "message" => $msgArray));
    $con->close();
}
