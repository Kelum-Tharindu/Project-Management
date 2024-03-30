document.addEventListener('DOMContentLoaded', function(){
var rr =0; 

if (rr == 1) {
    console.log("View Request");
    document.getElementById("addRequest").style.display = "none";
    document.getElementById("viewRequest").style.display = "flex";
} else if (rr == 0) {
    console.log("Add Request");
    document.getElementById("viewRequest").style.display = "none";
    document.getElementById("addRequest").style.display = "flex";
}
}
);
