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
