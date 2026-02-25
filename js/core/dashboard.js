function loadDashboard(){

document.getElementById("app").innerHTML=`

<div style="display:flex;height:100vh;background:#0f172a;color:white">

<!-- Sidebar -->
<div style="width:250px;background:#020617;padding:20px">

<h2>🏨 Hotel ERP</h2>

<button onclick="loadRoomManagement()">Room Management</button>
<button onclick="loadBookingSystem()">Booking System</button>
<button onclick="loadRestaurantMenu()">Restaurant</button>
<button onclick="loadFinance()">Finance</button>
<button onclick="loadUserManagement()">User Creation</button>

<button onclick="logout()"
style="background:red;color:white;margin-top:20px">
Logout
</button>

</div>

<!-- Content -->
<div id="dashboardContent"
style="flex:1;padding:30px;overflow:auto;background:#0f172a">

<h2>🏨 Welcome Hotel ERP System</h2>

</div>

</div>

`;

}
