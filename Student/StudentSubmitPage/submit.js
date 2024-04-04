document.addEventListener('DOMContentLoaded', function(){
console.log('hi');
var filedata = document.getElementById('input-file');
var btnRegister = document.getElementById('btnsubmit');

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('img-view');




// Event listener for file input change
inputFile.addEventListener('change', uploadFile);

// Drag and drop event listeners
dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadFile();
});









//------------------------------------upload file----------------------------------------------





function uploadFile() {
    const file = inputFile.files[0]; // Get the selected file

    // Check if file type is valid (allow only docx, pdf, txt, ppt, and pptx)
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    
    if (!allowedTypes.includes(file.type))
     {
        alert('Please upload only Word (docx), PDF, Text (txt), PowerPoint (ppt/pptx) files.');
        return;
    }
     //validate the file size
    //  if(file != null && file.size > 2097152){
    //     alert('File size is too large. Please upload a file less than 2MB');
    //     return;
    // }

    const imgLink = URL.createObjectURL(file); // Create URL for the file
    imageView.style.backgroundImage = 'none'; // Clear any background image
 

    imageView.innerHTML = '';

    // Create image element based on file type
    const imgElement = document.createElement('img');
    if (file.type === 'application/pdf') {
        imgElement.src = 'Icon/pdf.png'; 
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        imgElement.src = "Icon/word.png"; 
    } else if (file.type === 'text/plain') {
        imgElement.src = 'Icon/tet.jpg'; 
    } else if (file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        imgElement.src = 'powerpoint.png'; 
    }
    imgElement.classList.add('uploaded-image'); // Add a class to the image element

    // Append the image element to the image view
    imageView.appendChild(imgElement);

    // Display a message indicating the file type
    const fileTypeText = document.createElement('p');
    fileTypeText.textContent = `Uploaded ${file.name}`;
    imageView.appendChild(fileTypeText);


    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', file);

  
}




//----------------------------------------------------submit btn----------------------------------------------





// send profile pic to the server (to php file)
btnsubmit.addEventListener('click', function(){
    const file1 = inputFile.files[0]; 
    
    if(file1 != null){
        var formData = new FormData(); // create a new form data object
        formData.append('input-file', file1);
        formData.append('functionName', 'submit');
        
        $.ajax({
            url: 'submit.php',
            method: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false, // means no content type is required
            processData: false, // means no processing of data is required

            success: function(response){
                console.log(response);
                // location.reload();
            },

            error: function(error){
                console.error(error);
            }
        });
    }
});
 
});













 



    



