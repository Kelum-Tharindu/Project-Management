document.addEventListener('DOMContentLoaded', function(){
    console.log('hi');
    loadtcombo();

// function popupwindow(){
//     console.log('click');
//     var blur = document.getElementById('marks');
//     blur.classList.toggle('active');
//     var popup = document.getElementById('popup');
//     popup.classList.toggle('active');


// }
//add event listener to the button
// document.getElementById('btnfilter').addEventListener('click', popupwindow);

document.getElementById('btnclose').addEventListener('click', popupwindow);


btnfilter.addEventListener('click', function(){
    console.log("Filter button clicked");
    var course = document.getElementById('course').value;
    var batch = document.getElementById('batch').value;
    var index = document.getElementById('index').value;
    loadContent(course, batch, index);
  

});

});






function popupwindow(){


    console.log('click');
    var blur = document.getElementById('marks');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');


}


function loadContent(course,batch,index){ 
    console.log(" load Content called");
    $.ajax({
        url: 'studentmarkview.php',
        method: 'POST',
        data: {
            functionName: 'loadContent',
            course: course,
            batch: batch,
            index: index,
            
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
            var count = 0;
            var tt=0;
            // currentDisplayItems = response; //not used
            response.forEach(item => {
                // Get details from
               var index1 = item.S_Index;
               var name= item.S_Name;
               var inmark = item.inmarks;
               var docmark = item.docmarks;
               var Total = item.Tot;
                
                        console.log(index,name,docmark,inmark,Total);
                        // createtable(count,request, requestdate, reply, replydate, members, next, comment, meetdate);
                        createtable(index,name,docmark,inmark,Total);          
                            
                
        
                count++;
              
                
                
            });

           
            console.log("Item Data fetch success");
        },

        error: function(error){
            console.error(error);
        }
    });
}

function createtable(index,name,docmark,inmark,Total){
// Create table element
var table = document.createElement('table');

// Create header row
var headerRow = document.createElement('tr');

// Define header column texts
var headers = ['Student ID', 'Student Name', 'Team Marks', 'Individual Marks', 'Total Marks'];

// Create th elements for each header
headers.forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
});

// Append the header row to the table
table.appendChild(headerRow);

// Create a data row
var dataRow = document.createElement('tr');

// Define data cell texts
var data = [index, name, docmark, inmark, Total];

// Create td elements for each data cell
data.forEach(function(dataText) {
    var td = document.createElement('td');
    td.textContent = dataText;
    dataRow.appendChild(td);
});

// Append the data row to the table
table.appendChild(dataRow);

// Add table to the document body
document.body.appendChild(table);
}


//================================================loard Combox===================================================

function loadtcombo(){ 
    console.log("../loadtcombo called");
    $.ajax({
        url: '../LecturerSubmitionAdd/LecturerSubmition.php',
        method: 'POST',
        data: {
            functionname: 'loadcombobox',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
         
           
            response.course.forEach(item => {
                
                var course = item.Course;              
                console.log(course);
                
                createRow1(course);
            });
            response.batch.forEach(item => {
                
                var batch = item.Batch;              
                console.log(batch);
                
                createRow(batch);
            });
            console.log("Item Data fetch success");
        },

        error: function(error){
    console.log("error");
            console.error(error);
        }
    });
}

function createRow1(coursedata){
    var course = document.getElementById('course');


    var option = document.createElement('option');
    option.text = coursedata;
    option.value = coursedata;

    course.add(option);
}
function createRow(batchdata){
    var course = document.getElementById('batch');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.add(option);
}
