function loadDashboard(){

document.getElementById("app").innerHTML=`
<div style="display:flex;height:100vh;background:#0f172a;color:white">

<div style="width:250px;background:#020617;padding:20px">

<h2>🏨 Hotel ERP</h2>

<button onclick="loadRoomManagement()" style="width:100%;padding:12px;margin:5px">
🛏 Room Management
</button>

<button onclick="loadRestaurantMenu()" style="width:100%;padding:12px;margin:5px">
🍽 Restaurant
</button>

<button onclick="loadUserManagement()" style="width:100%;padding:12px;margin:5px">
👥 User Creation
</button>

<button onclick="loadBookingSystem()" style="width:100%;padding:12px;margin:5px">
📅 Booking System
</button>

<button onclick="logout()" style="width:100%;padding:12px;margin-top:20px;background:red;color:white">
Logout
</button>

</div>

<div id="dashboardContent" style="flex:1;padding:30px">
<h2>🏨 Dashboard</h2>
</div>

</div>
`;

}
