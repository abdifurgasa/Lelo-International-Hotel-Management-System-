function loadLogin(){

document.getElementById("app").innerHTML=`
<div style="height:100vh;display:flex;justify-content:center;align-items:center;
background:linear-gradient(135deg,#6a11cb,#2575fc,#2ecc71)">

<div style="background:white;padding:30px;border-radius:20px;width:300px;text-align:center">

<h2>🏨 Hotel ERP Login</h2>

<input id="username" placeholder="Username" style="width:100%;padding:10px;margin:10px 0">

<input id="password" type="password" placeholder="Password" style="width:100%;padding:10px;margin:10px 0">

<select id="role" style="width:100%;padding:10px;margin-bottom:10px">
<option value="admin">Admin</option>
<option value="manager">Manager</option>
<option value="reception">Reception</option>
<option value="worker">Worker</option>
</select>

<button onclick="login()" style="width:100%;padding:12px;background:#22c55e;color:white;border:none;border-radius:10px">
Login
</button>

</div>
</div>
`;

}

function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;
let role=document.getElementById("role").value;

if(u==="admin" && p==="1234"){

localStorage.setItem("login","ok");
localStorage.setItem("role",role);

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
