<?php
echo "Hello World!";
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "files";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if(isset($_POST["submit"])) {
    // Check if file was uploaded without errors
    if(isset($_FILES['fileToUpload']) && $_FILES['fileToUpload']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['fileToUpload']['tmp_name'];
        $fileName = $_FILES['fileToUpload']['name'];
        $fileSize = $_FILES['fileToUpload']['size'];
        $fileType = $_FILES['fileToUpload']['type'];

        // Define allowed file types
        $allowedExtensions = array('pdf', 'doc', 'docx');

        // Get file extension
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Check if file extension is allowed
        if(!in_array($fileExtension, $allowedExtensions)) {
            echo "Error: Only PDF, DOC, and DOCX files are allowed.";
        } else {
            // Check file size (limit to 5MB)
            $maxFileSize = 5 * 1024 * 1024; // 5MB
            if($fileSize > $maxFileSize) {
                echo "Error: File size exceeds 5MB limit.";
            } else {
                // Read the file content
                $content = file_get_contents($fileTmpPath);
                $content = addslashes($content); // Prevent SQL injection

                // Insert file content into the database
                $sql = "INSERT INTO files (filename, filetype, filecontent) VALUES ('$fileName', '$fileType', '$content')";
                if ($conn->query($sql) === TRUE) {
                    echo "File uploaded successfully.";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }
    } else {
        echo "Error uploading file.";
    }
}

$conn->close();
?>
