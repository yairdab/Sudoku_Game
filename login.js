function loginUser(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if(username == "abcd" && password == "1234"){
    window.location.href = "board.html";
  }
  else{
    document.getElementById("password").classList.add("wrong");
    document.getElementById("username").classList.add("wrong");
    document.getElementById("errorMsg").textContent= "Invalid username or password";
    document.getElementById("errorMsg").classList.add("wrong");
  }
  return false;
}

function removeWrong() {
  document.getElementById("password").classList.remove("wrong");
  document.getElementById("username").classList.remove("wrong");
}
