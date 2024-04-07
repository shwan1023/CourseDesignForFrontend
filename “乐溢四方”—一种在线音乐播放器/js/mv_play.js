var likeClicked = false;
document.getElementById("likesong").addEventListener("click", function() {
    var likeCountElement = this.querySelector(".like-count");
    var currentCount = parseInt(likeCountElement.textContent);
    
    if (likeClicked) {
        likeCountElement.textContent = currentCount - 1;
        
    } else {
        likeCountElement.textContent = currentCount + 1;
    }

    this.querySelector("i").classList.toggle("clicked");
    likeClicked = !likeClicked;
});