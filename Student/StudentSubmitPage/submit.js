document.addEventListener('DOMContentLoaded', function(){
console.log('hi');
var filedata = document.getElementById('input-file');
var btnRegister = document.getElementById('btnsubmit');

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('img-view');

// Function to handle file upload
function uploadFile() {
    const file = inputFile.files[0]; // Get the selected file

    // Check if file type is valid (allow only docx, pdf, txt, ppt, and pptx)
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload only Word (docx), PDF, Text (txt), PowerPoint (ppt/pptx) files.');
        return;
    }

    const imgLink = URL.createObjectURL(file); // Create URL for the file
    imageView.style.backgroundImage = 'none'; // Clear any background image
    // Clear any previous content
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


// Event listener for file input change
inputFile.addEventListener('change', uploadFile);

// Drag and drop event listeners
dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadFile(); // Trigger file upload function
});


// submit button
btnsubmit.addEventListener('click', function(event) { //after login button clicked
    event.preventDefault();
    submitFile();
}
);



function submitFile(){ // called from leftBarCatUl.addEventListener()
   console.log('submitFile');
document.addEventListener('DOMContentLoaded', function(){
console.log('hi');
var filedata = document.getElementById('input-file');
var btnRegister = document.getElementById('btnsubmit');

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('img-view');

// Function to handle file upload
function uploadFile() {
    const file = inputFile.files[0]; // Get the selected file

    // Check if file type is valid (allow only docx, pdf, txt, ppt, and pptx)
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload only Word (docx), PDF, Text (txt), PowerPoint (ppt/pptx) files.');
        return;
    }

    const imgLink = URL.createObjectURL(file); // Create URL for the file
    imageView.style.backgroundImage = 'none'; // Clear any background image
    // Clear any previous content
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


// Event listener for file input change
inputFile.addEventListener('change', uploadFile);

// Drag and drop event listeners
dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadFile(); // Trigger file upload function
});


// submit button
btnsubmit.addEventListener('click', function(event) { //after login button clicked
    event.preventDefault();
    submitFile();
}
);



function submitFile(file) { // Pass the file object as a parameter
    console.log('submitFile');
    
    console.log(file);
    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', file); // Append the file object to FormData

    function submitFile() {
        console.log('submitFile');
    
        // Get the file object from the input element
        const file = inputFile.files[0];
    
        // Create FormData object to send file
        const formData = new FormData();
        formData.append('input-file', file); // Append the file object to FormData
    
        $.ajax({
            url: 'submit.php',
            method: 'POST',
            data: formData, // Send FormData object containing the file data
            processData: false, // Prevent jQuery from automatically processing the data
            contentType: false, // Prevent jQuery from automatically setting the content type
            dataType: 'json',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    
}


    

});













 
}


    

});

