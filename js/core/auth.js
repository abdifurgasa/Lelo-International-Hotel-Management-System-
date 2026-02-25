function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u==="admin" && p==="1234"){

localStorage.setItem("login","ok");

loadDashboard();

}else{
alert("Wrong login");
}

}

function checkLogin(){

if(localStorage.getItem("login")==="ok"){
loadDashboard();
}else{
loadLogin();
}

}

function logout(){
localStorage.clear();
loadLogin();
}
