function loadDashboard(){

document.getElementById("app").innerHTML=`

<div style="display:flex;height:100vh">

<!-- Sidebar -->
<div style="width:250px;background:#020617;padding:20px;color:white">

<h2>Hotel ERP</h2>

<button onclick="loadRoomManagement()">Room Management</button>

<button onclick="logout()" 
style="background:red;color:white;margin-top:20px">
Logout
</button>

</div>

<!-- Content -->
<div id="dashboardContent" style="flex:1;padding:30px">
<h2>Welcome Dashboard ✅</h2>
</div>

</div>

`;
}
