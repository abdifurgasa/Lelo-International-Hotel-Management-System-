/*
====================================
HOTEL ERP MASTER SYSTEM
STEP 10 - ROOM + RESTAURANT + USERS
====================================
*/

window.onload = function(){
    loadData();
    showLogin();
};

// ================= DATABASE =================

let rooms=[];
let bookings=[];
let restaurantOrders=[];
let users=[];
let totalRevenue=0;
let dailyRevenue={};
let currentUser=null;

// ================= DATA LOAD =================

function loadData(){

if(localStorage.getItem("hotelMaster")){
let data=JSON.parse(localStorage.getItem("hotelMaster"));

rooms=data.rooms;
bookings=data.bookings;
restaurantOrders=data.restaurantOrders;
users=data.users;
totalRevenue=data.totalRevenue;
dailyRevenue=data.dailyRevenue;

}else{

rooms=[
{name:"Room 101",category:"Standard",price:1000,status:"Available"},
{name:"Room 102",category:"Deluxe",price:2000,status:"Available"},
{name:"Room 103",category:"VIP",price:3500,status:"Available"}
];

users=[
{username:"admin",password:"admin",role:"Manager"}
];

}
}

function saveData(){
localStorage.setItem("hotelMaster",JSON.stringify({
rooms,bookings,restaurantOrders,users,totalRevenue,dailyRevenue
}));
}

// ================= LOGIN =================

function showLogin(){

document.getElementById("app").innerHTML=`
<div style="height:100vh;display:flex;justify-content:center;align-items:center;
background:linear-gradient(135deg,#1e3c72,#2a5298);font-family:Arial">

<div style="background:white;padding:40px;border-radius:15px;width:320px;text-align:center">

<h2>🏨 Hotel ERP Master</h2>

<input id="username" placeholder="Username"
style="width:100%;padding:12px;margin:8px 0">

<input id="password" type="password" placeholder="Password"
style="width:100%;padding:12px;margin:8px 0">

<button onclick="login()"
style="width:100%;padding:12px;background:#1e3c72;color:white;border:none">
Login
</button>

</div>
</div>`;
}

function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

let user=users.find(x=>x.username===u && x.password===p);

if(user){
currentUser=user;
loadDashboard();
}else{
alert("Login Failed");
}

}

// ================= DASHBOARD =================

function loadDashboard(){

document.getElementById("app").innerHTML=`
<div style="font-family:Arial;background:#f4f7fa;height:100vh;display:flex">

<div style="width:230px;background:#1e3c72;color:white;padding:20px">

<p onclick="showHome()" style="cursor:pointer">📊 Dashboard</p>
<p onclick="showRooms()" style="cursor:pointer">🛏 Rooms</p>
<p onclick="showRestaurant()" style="cursor:pointer">🍽 Restaurant</p>
<p onclick="showFinance()" style="cursor:pointer">💰 Finance</p>
<p onclick="showUsers()" style="cursor:pointer">👤 Users</p>
<p onclick="showLogin()" style="cursor:pointer">🚪 Logout</p>

</div>

<div id="content" style="flex:1;padding:30px"></div>

</div>
`;

showHome();
}

// ================= HOME =================

function showHome(){

document.getElementById("content").innerHTML=`
<h1>📊 Dashboard</h1>

<h3>Total Rooms: ${rooms.length}</h3>
<h3>Total Orders: ${restaurantOrders.length}</h3>
<h3>Total Revenue: ${totalRevenue} Birr</h3>
`;
}

// ================= ROOMS =================

function showRooms(){

let html="<h1>🛏 Rooms</h1>";

rooms.forEach((room,index)=>{

html+=`
<div style="background:white;padding:15px;margin:10px 0;border-radius:8px">

<b>${room.name}</b> | ${room.category} | ${room.price} Birr

<span style="color:${room.status==="Available"?"green":"red"}">
${room.status}
</span>

<button onclick="bookRoom(${index})">Book</button>

</div>`;
});

document.getElementById("content").innerHTML=html;
}

function bookRoom(index){

let room=rooms[index];

if(room.status==="Occupied"){
alert("Occupied");
return;
}

let name=prompt("Customer Name");
let nights=prompt("Nights");

if(name && nights){

let total=room.price*parseInt(nights);

totalRevenue+=total;

room.status="Occupied";

let today=new Date().toLocaleDateString();

if(!dailyRevenue[today]) dailyRevenue[today]=0;
dailyRevenue[today]+=total;

bookings.push({
room:room.name,
customer:name,
amount:total,
date:today
});

saveData();
loadDashboard();
}
}

// ================= RESTAURANT =================

function showRestaurant(){

let menu=[
{name:"Rice & Chicken",price:300},
{name:"Burger",price:250},
{name:"Pizza",price:400},
{name:"Coffee",price:100}
];

let html="<h1>🍽 Restaurant Menu</h1>";

menu.forEach((item,i)=>{

html+=`
<div style="background:white;padding:15px;margin:10px 0;border-radius:8px">

${item.name} - ${item.price} Birr

<button onclick="orderFood('${item.name}',${item.price})">
Order
</button>

</div>`;
});

document.getElementById("content").innerHTML=html;
}

function orderFood(name,price){

let customer=prompt("Customer Name");

if(customer){

let today=new Date().toLocaleDateString();

restaurantOrders.push({
item:name,
customer:customer,
amount:price,
date:today
});

totalRevenue+=price;

if(!dailyRevenue[today]) dailyRevenue[today]=0;
dailyRevenue[today]+=price;

saveData();
alert("Order Successful");
}

}

// ================= FINANCE =================

function showFinance(){

let html=`<h1>💰 Finance Report</h1>
<h3>Total Revenue: ${totalRevenue} Birr</h3>
<hr>`;

for(let d in dailyRevenue){
html+=`<p>${d} : ${dailyRevenue[d]} Birr</p>`;
}

document.getElementById("content").innerHTML=html;
}

// ================= USERS =================

function showUsers(){

let html="<h1>👤 User Management</h1>";

users.forEach(u=>{
html+=`<p>${u.username} (${u.role})</p>`;
});

html+=`
<hr>
<input id="newUser" placeholder="Username">
<input id="newPass" placeholder="Password">
<button onclick="addUser()">Create User</button>
`;

document.getElementById("content").innerHTML=html;
}

function addUser(){

let u=document.getElementById("newUser").value;
let p=document.getElementById("newPass").value;

users.push({
username:u,
password:p,
role:"Reception"
});

saveData();
showUsers();
 }
