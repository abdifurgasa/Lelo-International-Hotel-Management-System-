function loadDashboard(){

document.getElementById("app").innerHTML=`

<div style="display:flex;height:100vh">

<div style="width:250px;background:#020617;padding:20px">

<h2>🏨 ERP Menu</h2>

<button onclick="loadRoomManagement()">Room</button>
<button onclick="loadBookingSystem()">Booking</button>
<button onclick="loadRestaurantMenu()">Restaurant</button>
<button onclick="loadUserManagement()">User Creation</button>
<button onclick="logout()" style="background:red;color:white">Logout</button>

</div>

<div id="dashboardContent" style="flex:1;padding:30px;overflow:auto">

<h2>Welcome ERP System</h2>

</div>

</div>

`;

}
<button onclick="loadRestaurantMenu()">
🍽 Restaurant Order
</button>
