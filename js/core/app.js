window.onload=function(){
checkLogin();
};

/* ROOM SYSTEM */

function loadRoomManagement(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`

<h2>🏨 Room Management</h2>

<div class="card" style="max-width:400px">

<input id="roomType" placeholder="Room Type" style="width:100%;padding:10px;margin:5px 0">

<input id="roomPrice" placeholder="Price" type="number" style="width:100%;padding:10px;margin:5px 0">

<input id="roomPhoto" type="file" accept="image/*">

<button onclick="addRoom()"
style="background:#22c55e;color:white;border:none;width:100%">
Add Room
</button>

</div>

<h3>Room List</h3>

<div id="roomList" style="display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px"></div>

`;

loadRooms();

}

function addRoom(){

let type=document.getElementById("roomType").value;
let price=document.getElementById("roomPrice").value;
let photo=document.getElementById("roomPhoto").files[0];

let reader=new FileReader();

reader.onload=function(){

rooms.push({
id:Date.now(),
type,
price,
photo:reader.result
});

saveDatabase();
loadRooms();

}

if(photo) reader.readAsDataURL(photo);

}

/* LOAD ROOMS */

function loadRooms(){

let list=document.getElementById("roomList");
if(!list) return;

list.innerHTML="";

rooms.forEach(r=>{

list.innerHTML+=`

<div class="card">

${r.photo?`<img src="${r.photo}" style="width:100%;height:140px;object-fit:cover;border-radius:15px">`:``}

<h3>${r.type}</h3>
<p>💰 ${r.price}</p>

<button onclick="deleteRoom(${r.id})"
style="background:red;color:white;border:none;width:100%">
Delete
</button>

</div>

`;

});

}

function deleteRoom(id){

rooms=rooms.filter(r=>r.id!==id);
saveDatabase();
loadRooms();

}

/* BOOKING SYSTEM */

function loadBookingSystem(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`

<h2>📅 Booking System</h2>

<div class="card">

<input id="customerName" placeholder="Customer Name"
style="width:100%;padding:10px;margin:5px 0">

<select id="bookingRoom" style="width:100%;padding:10px;margin:5px 0"></select>

<input id="bookingDays" type="number" placeholder="Days"
style="width:100%;padding:10px;margin:5px 0">

<button onclick="createBooking()"
style="background:#22c55e;color:white;width:100%">
Book Room
</button>

</div>

<h3>Booking List</h3>

<div id="bookingList"></div>

`;

loadBookingRooms();
loadBookings();

}

function loadBookingRooms(){

let select=document.getElementById("bookingRoom");
if(!select) return;

select.innerHTML="";

rooms.forEach(r=>{
select.innerHTML+=`<option value="${r.id}">${r.type}</option>`;
});

}

function createBooking(){

let name=document.getElementById("customerName").value;
let roomId=document.getElementById("bookingRoom").value;
let days=document.getElementById("bookingDays").value;

if(!name || !roomId || !days){
alert("Fill booking data");
return;
}

let room=rooms.find(r=>r.id==roomId);

let total=parseInt(room.price)*parseInt(days);

/* Booking Record */

bookings.push({
id:Date.now(),
customer:name,
roomId,
days,
total
});

/* Auto Billing */

bills.push({
id:Date.now()+1,
customer:name,
amount:total
});

saveDatabase();
loadBookings();

}

function loadBookings(){

let list=document.getElementById("bookingList");
if(!list) return;

list.innerHTML="";

bookings.forEach(b=>{

let room=rooms.find(r=>r.id==b.roomId)||{type:"Unknown"};

list.innerHTML+=`

<div class="card" style="margin:10px">

👤 ${b.customer}<br>
🏨 ${room.type}<br>
📅 Days ${b.days}

<button onclick="deleteBooking(${b.id})"
style="background:red;color:white;border:none;float:right">
X
</button>

</div>

`;

});

}

function deleteBooking(id){

bookings=bookings.filter(b=>b.id!==id);
saveDatabase();
loadBookings();

}
function loadRestaurantMenu(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`

<h2>🍽 Restaurant Menu</h2>

<div class="card">

<input id="menuName" placeholder="Food Name"
style="width:100%;padding:10px;margin:5px 0">

<input id="menuPrice" placeholder="Price" type="number"
style="width:100%;padding:10px;margin:5px 0">

<input id="menuPhoto" type="file" accept="image/*">

<button onclick="addMenu()"
style="background:#22c55e;color:white;width:100%">
Add Menu
</button>

</div>

<h3>Menu List</h3>

<div id="menuList"></div>

`;

loadMenus();

}
function addMenu(){

let name=document.getElementById("menuName").value;
let price=document.getElementById("menuPrice").value;
let photo=document.getElementById("menuPhoto").files[0];

let reader=new FileReader();

reader.onload=function(){

menus.push({
id:Date.now(),
name,
price,
photo:reader.result
});

saveDatabase();
loadMenus();

}

if(photo) reader.readAsDataURL(photo);

}
function loadMenus(){

let list=document.getElementById("menuList");
if(!list) return;

list.innerHTML="";

menus.forEach(m=>{

list.innerHTML+=`

<div class="card" style="margin:10px">

${m.photo?`<img src="${m.photo}"
style="width:100%;height:120px;object-fit:cover;border-radius:10px">`:``}

<h3>${m.name}</h3>
💰 ${m.price}

</div>

`;

});

}
