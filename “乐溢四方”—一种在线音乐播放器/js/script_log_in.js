

var Login_button = document.getElementById("adiv");

function login() {
  event.preventDefault(); 
  window.location.href = "./home.html";
}

Login_button.addEventListener("click", login);