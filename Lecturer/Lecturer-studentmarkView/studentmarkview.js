document.addEventListener('DOMContentLoaded', function(){
    console.log('hi');

function popupwindow(){
    console.log('click');
    var blur = document.getElementById('marks');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');


}
//add event listener to the button
document.getElementById('btnfilter').addEventListener('click', popupwindow);

document.getElementById('btnclose').addEventListener('click', popupwindow);


});
