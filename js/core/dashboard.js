function loadDashboard(){

const app=document.getElementById("app");

app.innerHTML=`
<div style="min-height:100vh;
background:linear-gradient(135deg,#6a11cb,#2575fc,#2ecc71);
color:white;padding:20px">

<h2 style="text-align:center">🏨 Hotel Dashboard</h2>

<div style="text-align:center;margin-bottom:20px">

<button onclick="loadRoomManagement()" style="padding:10px;margin:5px">
Room Management
</button>

<button onclick="loadFinance()" style="padding:10px;margin:5px">
Finance
</button>

<button onclick="logout()" style="padding:10px;margin:5px;background:red;color:white">
Logout
</button>

</div>

</div>
`;
}
