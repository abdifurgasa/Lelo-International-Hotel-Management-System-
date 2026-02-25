function loadDashboard(){

document.getElementById("app").innerHTML = `

<div style="display:flex;height:100vh">

<div style="width:250px;background:#020617;padding:20px;color:white">

<h2>Hotel ERP</h2>

<button onclick="loadHome()">Home</button>
<button onclick="logout()" style="background:red;color:white;margin-top:20px">
Logout
</button>

</div>

<div id="dashboardContent" style="flex:1;padding:30px;background:#0f172a;color:white">
<h2>Dashboard Working ✅</h2>
</div>

</div>

`;

}

function loadHome(){
document.getElementById("dashboardContent").innerHTML =
"<h2>Welcome Back ✅</h2>";
}
