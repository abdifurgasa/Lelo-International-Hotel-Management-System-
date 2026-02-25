window.onload=function(){
checkLogin();
};

/* ROOM SYSTEM */

let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

function loadRoomManagement(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`

<h2>Room Management</h2>

<input id="roomType" placeholder="Room Type"
style="padding:8px;margin:5px;width:200px">

<input id="roomPrice" type="number" placeholder="Price"
style="padding:8px;margin:5px;width:200px">

<input id="roomPhoto" type="file">

<button onclick="addRoom()"
style="background:#22c55e;color:white;border:none;width:200px">
Add Room
</button>

<h3>Room List</h3>

<div id="roomList" style="display:flex;flex-wrap:wrap"></div>

`;

loadRooms();
}

function addRoom(){

let type=document.getElementById("roomType").value;
let price=document.getElementById("roomPrice").value;

if(!type || !price){
alert("Fill all fields");
return;
}

rooms.push({
id:Date.now(),
type,
price,
status:"Available",
photo:""
});

saveRooms();
loadRooms();
}

function loadRooms(){

rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

let list=document.getElementById("roomList");
if(!list) return;

list.innerHTML="";

rooms.forEach(room=>{

list.innerHTML+=`

<div class="card" style="margin:10px;width:220px">

<h4>${room.type}</h4>
<p>Price: ${room.price}</p>
<p>Status: ${room.status}</p>

<button onclick="toggleRoom(${room.id})"
style="background:#2563eb;color:white">
Toggle Available/Booked
</button>

<button onclick="deleteRoom(${room.id})"
style="background:red;color:white">
Delete Room
</button>

</div>

`;

});
}

function toggleRoom(id){

rooms = rooms.map(r=>{
if(r.id===id){
r.status = r.status==="Available" ? "Booked" : "Available";
}
return r;
});

saveRooms();
loadRooms();
}

function deleteRoom(id){

rooms = rooms.filter(r=>r.id!==id);

saveRooms();
loadRooms();
}
