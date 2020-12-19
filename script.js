window.onload = function() {
    fetch('clinics.json?v=2')
        .then(response => response.json())
        .then(data => console.log(data));
}
