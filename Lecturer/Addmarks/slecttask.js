document.addEventListener('DOMContentLoaded', function(){

    
    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });
});