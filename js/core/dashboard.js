function loadDashboard(){

let app=document.getElementById("app");

app.innerHTML=`
<div style="padding:20px">

<h2>🏨 Hotel ERP Pro Dashboard</h2>

<div style="display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px">

<div class="card">🛏 Rooms : ${rooms.length}</div>
<div class="card">🍽 Menu : ${menus.length}</div>
<div class="card">💰 Bills : ${bills.length}</div>

</div>

<br>

<div class="card">
<canvas id="chart"></canvas>
</div>

<br>

<button onclick="loadRoomManagement()">Room Management</button>
<button onclick="loadMenuManagement()">Restaurant Menu</button>
<button onclick="loadFinance()">Finance</button>
<button onclick="logout()" style="background:red;color:white">Logout</button>

</div>
`;

drawChart();

}

function drawChart(){

setTimeout(()=>{

let ctx=document.getElementById("chart");

if(!ctx) return;

new Chart(ctx,{
type:"bar",
data:{
labels:["Rooms","Menu","Bills"],
datasets:[{
label:"Hotel Analytics",
data:[rooms.length,menus.length,bills.length]
}]
}
});

},300);

}
