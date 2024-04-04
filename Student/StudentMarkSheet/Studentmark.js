document.addEventListener('DOMContentLoaded', function() {
   
        console.log("js file loaded");

    loadtTeamTable();
    loadtindividualTable();


//------------------------------------------------------------------create team table------------------------------------------------------------



    function loadtTeamTable(){ 
        console.log("loadtTeamTable called");
        $.ajax({
            url: 'Studentmarks.php',
            method: 'POST',
            data: {
                functionName: 'loadTeam',
                
            },
            
            dataType: 'json',
            
            // When http request is success
            success: function(response){
                console.log("data readed from db successfullly")
                console.log(response);
                var count = 1;
                // currentDisplayItems = response; //not used
                response.forEach(item => {
                    // Get details from
                    var taskname = item.title;
                    var marks = item.marks;
                    var comment = item.comment;
                    var doc= item.Doc;
                    console.log(taskname, marks, comment, doc);
                    
                    
                    
                    createRow(count,taskname, marks, comment, doc);
                    count++;
                });
                

             
                console.log("Item Data fetch success");
            },
    
            error: function(error){
                console.error(error);
            }
        });
    }

    // createRow,called from loadtTeamTable


function createRow(count,taskname, marks, comment, doc) {
  console.log("createRow called".count);
    
    if(count==1){

        var teamDiv = document.getElementById('team');
        var table = document.createElement('table');
        table.id = 'teamTable';

     
        var headerRow = document.createElement('tr');
        var tbody = document.createElement('tbody');
        var headers = ['Task Number','Task Name', 'Marks', 'Comment', 'Document'];
        headers.forEach(function(header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        
        table.appendChild(headerRow);
       
    }
    console.log("Row head created");

    if(count>-1){
    // Create table body
    
    
        var row = document.createElement('tr');
       
        var tasknocol = document.createElement('td');
        tasknocol.textContent = count;

        var tasknamecol = document.createElement('td');
        tasknamecol.textContent = taskname;

        var markscol = document.createElement('td');
        markscol.textContent = marks;

        var comments = document.createElement('td');
        comments.textContent = comment;

        var documents = document.createElement('td');
        documents.textContent = doc;

        row.appendChild(tasknocol);
        row.appendChild(tasknamecol);
        row.appendChild(markscol);
        row.appendChild(comments);
        row.appendChild(documents);
        
        tbody.appendChild(row);
    
    table.appendChild(tbody);

    // Append table to 'team' div
   
  

    teamDiv.appendChild(table);
    console.log("Row created");
    }


}

//---------------------------------------------------------create individual marks table------------------------------------------------------------



function loadtindividualTable(){ 
    console.log("load individual Table called");
    $.ajax({
        url: 'Studentmarks.php',
        method: 'POST',
        data: {
            functionName: 'loadindividual',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
            var count = 1;
            // currentDisplayItems = response; //not used
            response.forEach(item => {
                // Get details from
                var taskname = item.title;
                var marks = item.marks;
                var comment = item.comment;
            
                console.log(taskname, marks, comment);
                
                
                
                createindividualRow(count,taskname, marks, comment);
                count++;
            });
            

         
            console.log("Item Data fetch success");
        },

        error: function(error){
            console.error(error);
        }
    });
}

// createRow,called from loadtTeamTable


function createindividualRow(count,taskname, marks, comment) {
console.log("createRow called".count);

if(count==1){

    var individualDiv = document.getElementById('ind');
    var table = document.createElement('table');
    table.id = 'teamTable';

 
    var headerRow = document.createElement('tr');
    var tbody = document.createElement('tbody');
    var headers = ['Task Number','Task Name', 'Marks', 'Comment'];
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
   
}
console.log("Row head created");

if(count>-1){
// Create table body


    var row = document.createElement('tr');
   
    var tasknocol = document.createElement('td');
    tasknocol.textContent = count;

    var tasknamecol = document.createElement('td');
    tasknamecol.textContent = taskname;

    var markscol = document.createElement('td');
    markscol.textContent = marks;

    var comments = document.createElement('td');
    comments.textContent = comment;


   

    row.appendChild(tasknocol);
    row.appendChild(tasknamecol);
    row.appendChild(markscol);
    row.appendChild(comments);

    
    tbody.appendChild(row);

table.appendChild(tbody);

// Append table to 'team' div



individualDiv.appendChild(table);
console.log("Row created");
}


}





});