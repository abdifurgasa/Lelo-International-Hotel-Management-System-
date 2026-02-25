function loadLogin(){

document.getElementById("app").innerHTML = `
<div style="height:100vh;display:flex;justify-content:center;align-items:center;background:#0f172a">

<div style="background:white;padding:30px;border-radius:10px;width:300px;text-align:center;color:black">

<h2>Hotel ERP Login</h2>

<input id="username" placeholder="Username"
style="width:100%;padding:10px;margin:10px 0">

<input id="password" type="password" placeholder="Password"
style="width:100%;padding:10px;margin:10px 0">

<button onclick="login()"
style="width:100%;padding:10px;background:#22c55e;color:white;border:none">
Login
</button>

</div>
</div>
`;
}

function login(){

let u = document.getElementById("username").value;
let p = document.getElementById("password").value;

if(u === "admin" && p === "1234"){
localStorage.setItem("login","ok");
loadDashboard();
}else{
alert("Wrong login");
}

}

function checkLogin(){

if(localStorage.getItem("login") === "ok"){
loadDashboard();
}else{
loadLogin();
}

}

function logout(){
localStorage.removeItem("login");
loadLogin();
}
