// script.js

// Add an event listener to the button
document.getElementById("postButton").addEventListener("click", function (event) {
    event.preventDefault();
});
    // Get the value of the input field
    var postInput = document.getElementById("postInput");
    var postText = postInput.value;