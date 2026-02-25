window.onload=function(){
checkLogin();
}

function loadRoomManagement(){

let app=document.getElementById("app");

app.innerHTML=`
<div style="padding:20px">

<h2>🏨 Room Management</h2>

<input id="roomType" placeholder="Room Type" style="padding:10px;width:200px">
<input id="roomPrice" placeholder="Price" type="number" style="padding:10px;width:200px">

<input id="roomPhoto" type="file">

<button onclick="addRoom()">Add Room</button>

<div id="roomList" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:30px"></div>

</div>
`;

loadRooms();

}

function addRoom(){

let type=document.getElementById("roomType").value;
let price=document.getElementById("roomPrice").value;
let photo=document.getElementById("roomPhoto").files[0];

if(!type || !price){
alert("Fill data");
return;
}

let reader=new FileReader();

reader.onload=function(){

rooms.push({
id:Date.now(),
type,
price,
photo:reader.result
});

saveAll();
loadRooms();

}

if(photo) reader.readAsDataURL(photo);
}

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

<button onclick="deleteRoom(${r.id})" style="background:red;color:white;border:none;padding:8px;width:100%">
Delete
</button>

</div>
`;

});

}

function deleteRoom(id){

rooms=rooms.filter(r=>r.id!==id);
saveAll();
loadRooms();

}
function loadRestaurantMenu(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`
<h2>🍽 Restaurant Menu</h2>

<div class="card" style="max-width:400px">

<input id="menuName" placeholder="Food Name" style="width:100%;padding:10px;margin:5px 0">

<input id="menuPrice" placeholder="Price" type="number" style="width:100%;padding:10px;margin:5px 0">

<input id="menuPhoto" type="file">

<button onclick="addMenu()" style="width:100%;padding:10px;background:#22c55e;color:white;border:none">
Add Menu
</button>

</div>

<h3>Menu List</h3>

<div id="menuList" style="display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px"></div>
`;

loadMenus();
}
function addMenu(){

let name=document.getElementById("menuName").value;
let price=document.getElementById("menuPrice").value;
let photo=document.getElementById("menuPhoto").files[0];

if(!name || !price){
alert("Fill menu data");
return;
}

let reader=new FileReader();

reader.onload=function(){

menus.push({
id:Date.now(),
name,
price,
photo:reader.result
});

saveAll();
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
<div class="card">

${m.photo?`<img src="${m.photo}" style="width:100%;height:140px;object-fit:cover;border-radius:15px">`:``}

<h3>${m.name}</h3>
<p>💰 ${m.price}</p>

<button onclick="deleteMenu(${m.id})" style="width:100%;background:red;color:white;border:none;padding:8px">
Delete
</button>

</div>
`;

});

}

function deleteMenu(id){

menus=menus.filter(m=>m.id!==id);
saveAll();
loadMenus();

}
function loadUserManagement(){

let content=document.getElementById("dashboardContent");

content.innerHTML=`
<h2>👥 User Creation</h2>

<div class="card" style="max-width:400px">

<input id="newUser" placeholder="Username" style="width:100%;padding:10px;margin:5px 0">

<select id="newRole" style="width:100%;padding:10px;margin:5px 0">
<option>admin</option>
<option>manager</option>
<option>reception</option>
<option>worker</option>
</select>

<button onclick="createUser()" style="width:100%;padding:10px;background:#22c55e;color:white">
Create User
</button>

</div>
`;
}
