window.onload = function () {
    checkLogin();
};

let rooms = [];

function loadRoomManagement(){

let content = document.getElementById("dashboardContent");

content.innerHTML = `

<h2>Room Management</h2>

<input id="roomType" placeholder="Room Type"
style="padding:8px;margin:5px 0;width:200px">

<input id="roomPrice" placeholder="Price"
type="number"
style="padding:8px;margin:5px 0;width:200px">

<button onclick="addRoom()"
style="padding:8px;background:#22c55e;color:white;border:none">
Add Room
</button>

<h3>Room List</h3>
<div id="roomList"></div>

`;

loadRooms();
}

function addRoom(){

let type = document.getElementById("roomType").value;
let price = document.getElementById("roomPrice").value;

if(!type || !price){
alert("Fill all fields");
return;
}

rooms.push({
id: Date.now(),
type,
price
});

loadRooms();
}

function loadRooms(){

let list = document.getElementById("roomList");
if(!list) return;

list.innerHTML = "";

rooms.forEach(r => {

list.innerHTML += `
<div style="background:#f1f1f1;color:black;padding:10px;margin:5px;width:200px">
Room: ${r.type} <br>
Price: ${r.price}
</div>
`;

});
}
