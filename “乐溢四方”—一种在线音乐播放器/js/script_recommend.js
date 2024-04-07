
var Download_button = document.getElementById("Download_button");

function Download() {
    alert("感谢您的下载！");
}

Download_button.addEventListener("click", Download);

$(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 70;
          if ($(window).scrollTop() > navHeight) {
              $('nav').addClass('fixed');
          }
          else {
              $('nav').removeClass('fixed');
          }
     });
 });