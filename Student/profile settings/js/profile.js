document.addEventListener('DOMContentLoaded', function () {
    
    // fetch the navbar from the incluedes folder
    var btnSave = document.getElementById('btn-save');
    var btnCancel = document.getElementById('btn-cancel');
    var inputNewProfile = document.getElementById('newProfile');
    var preview = document.getElementById('profilePreview'); //img

    // These are '<input>' not the values
    var nameInput = document.getElementById('name');
    var nicInput = document.getElementById('nic');
    var emailInput = document.getElementById('email');
    var psswdInput = document.getElementById('psswd');
    var phoneInput = document.getElementById('phone');
    var sexOption = document.getElementById('sex');
    var dobInput = document.getElementById('dob');
    var addressInput = document.getElementById('address');
    var cmbCatList1 = document.getElementById('cat-list1-cmb');
    var cmbCatList2 = document.getElementById('cat-list2-cmb');
    var cmbCatList3 = document.getElementById('cat-list3-cmb');

    // These are new variables to store the new values
    var nameNew;
    var nicNew;
    var emailNew;
    var psswdHashNew; // hash of the password
    var phoneNew;
    var sexNew;
    var dobNew;
    var addressNew;
    
    // error state
    var nameNewNoError = true;
    var nicNewNoError = true;
    var emailNewNoError = true;
    var psswdHashNewNoError = true;
    var phoneNewNoError = true;
    var dobNewNoError = true;
    var addressNewNoError = true;

    var catIDListChanged = false;


    var inputFeilds = Array.from(document.getElementsByClassName('input-feild')); // array of all input fields

    var today = new Date();

    var file = null; // file to be uploaded (image)

    // fetch the nav bar
    fetch('../Navigation-bar/Nav-Bar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('nav123').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching content:', error);
});
    

    // ============================== Fetch and Fill User Data ================================
    // fetch and fill user data 
    fetchUserData();

    // fetch the user data from the server
    function fetchUserData(){
        $.ajax({
            url: 'php/profile-settings.php',
            method: 'POST',
            data: {
                functionName: 'getUserData',
            },
            dataType: 'json',
            success: function(response){
                //response has only one object with key 'userData'
                fillUserData(response.userData)
            },
            error: function(error){
                console.error(error);
            }
        });
    }

    function fillUserData(userData){
        nameInput.value = userData.FullName;
        nicInput.value = userData.NIC;
        emailInput.value = userData.Email;
        phoneInput.value = userData.Mobile
        sexOption.value = userData.Sex;
        dobInput.value = userData.BirthDate;
        addressInput.value = userData.Address;

        var favCatIDList = null;

        // If user has fave categories, then set favCatIDList to that list, otherwise it remains empty
        if(userData.categories){
            favCatIDList = userData.categories;
        }
        requestFillCatCmb(favCatIDList);
    }

    function requestFillCatCmb(favCatIDList){ // get the rest of the categories from jobs.php
        $.ajax({
            url: 'php/jobs.php',
            method: 'POST',
            data: {
                functionName: 'getCategoryList',
            },
            dataType: 'json',

            success: function(response){ // Response is a list of categories
                // First fill the comboboxes with all available categories
                response.forEach(function(category){ 
                    fillCatCmb(category.CatID, category.CatName);
                });

                // Set the fave categories in each combobox as selected, if it exists
                if(favCatIDList != null){
                    if(favCatIDList[0]){
                        cmbCatList1.value = favCatIDList[0];
                    }
                    if(favCatIDList[1]){
                        cmbCatList2.value = favCatIDList[1];
                    }
                    if(favCatIDList[2]){
                        cmbCatList3.value = favCatIDList[2];
                    }
                }
            },

            error: function(error){
                console.error(error);
            }
        });
    }

    function fillCatCmb(catId, catName){ // update the category combobox with all available categories
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');

        option1.id = catId;
        option1.value = catId;
        option1.text = catName;

        option2.id = catId;
        option2.value = catId;
        option2.text = catName;

        option3.id = catId;
        option3.value = catId;
        option3.text = catName;

        cmbCatList1.appendChild(option1);
        cmbCatList2.appendChild(option2);
        cmbCatList3.appendChild(option3);
    }


    // ============================== Update Data ================================
    // preview the image before uploading
    inputNewProfile.addEventListener('change', function(event){
        var preview = document.getElementById('profilePreview'); //img
        file = event.target.files[0];
        var reader = new FileReader();

        //validate the file type
        if(file != null && file.type != 'image/jpeg' && file.type != 'image/png'){
            alert('Invalid file type. Please upload a valid image file');
            return;
        }
        
        //validate the file size
        if(file != null && file.size > 2097152){
            alert('File size is too large. Please upload a file less than 2MB');
            return;
        }
        // read the file and display the preview
        reader.onloadend = function () {
            preview.src = reader.result;
        }
        
        // if a file is selected then read the file
        if (file) {
            reader.readAsDataURL(file);
        } 
        else { // if no file is selected then remove the preview
            preview.src = "";
        }
    });

    // ------------------- validate the input fields -------------------
    nameInput.addEventListener('input', function(){
        if(nameInput.value.length < 5){
            nameInput.style.borderColor = 'red';
            nameNew = null;
            nameNewNoError = false;
        }
        else{
            nameInput.style.borderColor = 'green';
            nameNew = nameInput.value;
            nameNewNoError = true;
        }
    });

    nicInput.addEventListener('input', function(){
        if(nicInput.value.length < 8 || nicInput.value.length > 12){
            nicInput.style.borderColor = 'red';
            nicNew = null;
            nicNewNoError = false;
        }
        else{
            nicInput.style.borderColor = 'green';
            nicNew = nicInput.value;
            nicNewNoError = true;
        }
    });

    emailInput.addEventListener('input', function(){
        if(emailInput.value.indexOf('@') == -1 || emailInput.value.indexOf('.') == -1 || emailInput.value.length < 12){
            emailInput.style.borderColor = 'red';
            emailNew = null;
            emailNewNoError = false;
        }
        else{
            emailInput.style.borderColor = 'green';
            emailNew = emailInput.value;
            emailNewNoError = true;
        }
    });

    psswdInput.addEventListener('input', function(){
        if(psswdInput.value.length < 8){
            psswdInput.style.borderColor = 'red';
            psswdHashNew = null;
            psswdHashNewNoError = false;
        }
        else{
            psswdInput.style.borderColor = 'green';
            psswdHashNew = psswdInput.value;
            psswdHashNewNoError = true;
        }
    });

    phoneInput.addEventListener('input', function(){
        if(phoneInput.value.length < 10){
            phoneInput.style.borderColor = 'red';
            phoneNew = null;
            phoneNewNoError = false;
        }
        else{
            phoneInput.style.borderColor = 'green';
            phoneNew = phoneInput.value;
            phoneNewNoError = true;
        }
    });

    sexOption.addEventListener('input', function(){
        sexNew = sexOption.value;
    });

    dobInput.addEventListener('input', function(){
        const birthDateFull = new Date(document.getElementById('dob').value);
        var age = today.getFullYear() - birthDateFull.getFullYear(); //calculate age

        // if age is less than 16 or greater than 100, then show error
        if(age < 16 || age > 100){
            dobInput.style.borderColor = 'red';
            dobNew = null;
            dobNewNoError = false;
        }
        else{
            dobInput.style.borderColor = 'green';
            dobNew = dobInput.value;
            dobNewNoError = true;
        }
    });

    addressInput.addEventListener('input', function(){
        if(addressInput.value.length < 5){
            addressInput.style.borderColor = 'red';
            addressNew = null;
            addressNewNoError = false;
        }
        else{
            addressInput.style.borderColor = 'green';
            addressNew = addressInput.value;
            addressNewNoError = true;
        }
    });

    const catCmb = Array.from(document.getElementsByClassName('cat-cmb'));
    catCmb.forEach(cmb => {
        cmb.addEventListener('change', function(){
            catIDListChanged = true;
        });
    });

    // send profile pic to the server (to php file)
    btnSave.addEventListener('click', function(){
        catIDListNew = []; 

        // if a new profile picture is selected
        if(file != null){ 
            var formData = new FormData(); // create a new form data object
            formData.append('newProfile', file);
            formData.append('functionName', 'updateProfilePic');
            
            // request to the server to update the profile picture in the database
            // profile img update part
            $.ajax({
                url: 'php/profile-settings.php',
                method: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false, // means no content type is required
                processData: false, // means no processing of data is required

                success: function(response){
                    console.log(response);
                    setNavProfilePic(); // function from navBar.js
                    // location.reload();
                },

                error: function(error){
                    console.error(error);
                }
            });
        }

        // if any of the input fields are invalid
        if(!nameNewNoError || !nicNewNoError || !emailNewNoError || !psswdHashNewNoError || !phoneNewNoError || !dobNewNoError || !addressNewNoError){
            alert('Please fill all fields correctly');
        }
        else{
            // if all the input fields are valid

            const catCmb = Array.from(document.getElementsByClassName('cat-cmb'));
            
            // get the selected categories
            if(catIDListChanged){
                catCmb.forEach(cmb => {
                    if(cmb.selectedIndex != 0) {
                        var alreadySelected = false; // flag to check if the category is already selected in another combobox
                    
                        // check if the category is already selected in another cmbbox then add it to the list
                        for (var i = 0; i <= catIDListNew.length; i++) {
                            if (catIDListNew[i] == cmb.value) {
                                alreadySelected = true;
                                break;
                            }
                        }
                        // if the category is not selected any other combobox then add it to the list
                        if (!alreadySelected){
                            catIDListNew.push(cmb.value);
                        }
                    }
                    else{
                        // if the category is not selected then remove it from the list, if it exists in the list
                        // for (var i = 0; i <= catIDListNew.length; i++) {
                        //     if (catIDListNew[i] == cmb.value) {
                        //         console.log(catIDListNew[i]);
                        //         break;
                        //     }
                        // }
                        console.log('none selected');
                    }
                });
            }
            

            // if no errors occured, create data object to send to the server except the profile picture and categories
            var userData = {}; // create an object to store the user data

            if(nameNew != null){
                userData.name = nameNew;
            }
            if(nicNew != null){
                userData.nic = nicNew;
            }
            if(emailNew != null){
                userData.email = emailNew;
            }
            if(psswdHashNew != null){
                userData.psswdHash = psswdHashNew;
            }
            if(phoneNew != null){
                userData.phone = phoneNew;
            }
            if(sexNew != null){
                userData.sex = sexNew;
            }
            if(dobNew != null){
                userData.dob = dobNew;
            }
            if(addressNew != null){
                userData.address = addressNew;
            }
            
            if(catIDListNew.length > 0){
                userData.catIDList = catIDListNew;
            }
           
            // send the data to the server, if userData is not empty

            // user data update part
            // if the user data has any data then send it to the server
            if(Object.keys(userData).length > 0){
                $.ajax({
                    url: 'php/profile-settings.php',
                    method: 'POST',
                    data: {
                        functionName: 'updateUserData',
                        data: userData,
                    },
                    dataType: 'json',
    
                    success: function(response){
                        console.log(response);
                        if(response.status == 'success'){
                            catIDListChanged = false;
                            alert('Profile Updated');
                            // Swal.fire({
                            //     icon: 'success',
                            //     title: 'Profile Updated',
                            //     text: 'Your profile has been updated successfully.',
                            // });
                        }
                        {
                            // Swal.fire({
                            //     icon: 'error',
                            //     title: 'Profile Update Failed',
                            //     text: 'Your profile could not be updated. Please try again.',
                            // });
                        }
                        fetchUserData();
                        
                    },
    
                    error: function(error){
                        console.error(error);
                    }
                });
            }
        }
    });
    
    // cancel the profile picture upload
    btnCancel.addEventListener('click', function(){
        preview.src = "";
        inputNewProfile.value = "";
    });


});

