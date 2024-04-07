var imgClicked = false;
window.addEventListener("message", function(event) {
  if (event.data === "imageClicked") {
    // 图片被点击
    var iframe = document.getElementById("iframe-container");
    
    if (imgClicked) {
      iframe.style.zIndex = "9";
    } else {
      iframe.style.zIndex = "11";
    }
    
    imgClicked = !imgClicked;
  }
});


