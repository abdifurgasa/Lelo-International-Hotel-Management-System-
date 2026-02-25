function loadLogin(){

document.getElementById("app").innerHTML=`

<div style="height:100vh;display:flex;justify-content:center;align-items:center;
background:linear-gradient(135deg,#6a11cb,#2575fc,#2ecc71)">

<div class="card" style="width:300px;text-align:center;background:white;color:black">

<h2>🏨 Hotel ERP Login</h2>

<input id="username" placeholder="Username"
style="width:100%;padding:10px;margin:10px 0">

<input id="password" type="password" placeholder="Password"
style="width:100%;padding:10px;margin:10px 0">

<button onclick="login()"
style="background:#22c55e;color:white">
Login
</button>

</div>
</div>

`;

}

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
checkLogin();
}
