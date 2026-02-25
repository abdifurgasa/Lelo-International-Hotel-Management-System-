function loadDashboard(){

const app=document.getElementById("app");

app.innerHTML=`
<div style="display:flex;height:100vh;background:#0f172a;color:white">

<!-- ===== SIDEBAR ===== -->
<div style="width:250px;background:#020617;padding:20px">

<h2>🏨 Hotel ERP</h2>

<hr>

<button onclick="loadRoomManagement()" style="width:100%;padding:12px;margin:5px 0">
🛏 Room Management
</button>

<button onclick="loadRestaurantMenu()" style="width:100%;padding:12px;margin:5px 0">
🍽 Restaurant
</button>

<button onclick="loadUserManagement()" style="width:100%;padding:12px;margin:5px 0">
👥 User Creation
</button>

<button onclick="logout()" style="width:100%;padding:12px;margin-top:20px;background:red;color:white">
Logout
</button>

</div>

<!-- ===== CONTENT AREA ===== -->
<div id="dashboardContent" style="flex:1;padding:30px;overflow:auto">

<h2>🏨 Welcome Hotel Dashboard</h2>

<div style="display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px">

<div class="card">Rooms : ${rooms.length}</div>
<div class="card">Menu : ${menus.length}</div>
<div class="card">Bills : ${bills.length}</div>

</div>

</div>

</div>
`;
}
