window.onload=function(){
    checkLogin();
}

/* ========= ROOM MANAGEMENT ========= */

function loadRoomManagement(){

const app=document.getElementById("app");

app.innerHTML=`
<div style="min-height:100vh;background:linear-gradient(135deg,#6a11cb,#2575fc);color:white;padding:20px">

<h2 style="text-align:center">🏨 Room Management</h2>

<div style="max-width:500px;margin:auto;background:rgba(255,255,255,0.15);padding:20px;border-radius:20px">

<input id="roomType" placeholder="Room Type" style="width:100%;padding:10px;margin:5px 0">

<input id="roomPrice" placeholder="Price" type="number" style="width:100%;padding:10px;margin:5px 0">

<input id="roomPhoto" type="file" accept="image/*">

<button onclick="addRoom()" style="width:100%;padding:12px;margin-top:10px;background:#2ecc71;color:white;border:none">
Add Room
</button>

</div>

<h3 style="text-align:center;margin-top:30px">Room List</h3>

<div id="roomList" style="display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;padding:20px"></div>

</div>
`;

loadRooms();

}

function addRoom(){

let type=document.getElementById("roomType").value;
let price=document.getElementById("roomPrice").value;
let photo=document.getElementById("roomPhoto").files[0];

if(!type || !price){
alert("Fill all fields");
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

saveRooms();
loadRooms();

}

if(photo){
reader.readAsDataURL(photo);
}else{
rooms.push({
id:Date.now(),
type,
price,
photo:""
});

saveRooms();
loadRooms();
}

}

function loadRooms(){

let list=document.getElementById("roomList");
if(!list) return;

list.innerHTML="";

rooms.forEach(r=>{

list.innerHTML+=`
<div style="background:rgba(255,255,255,0.2);
padding:15px;border-radius:15px;text-align:center">

${r.photo?`<img src="${r.photo}" style="width:100%;height:140px;object-fit:cover;border-radius:10px">`:``}

<h3>${r.type}</h3>
<p>💰 ${r.price}</p>

<button onclick="deleteRoom(${r.id})"
style="width:100%;padding:8px;background:red;color:white;border:none;border-radius:8px">
Delete
</button>

</div>
`;

});

}

function deleteRoom(id){

rooms=rooms.filter(r=>r.id!==id);
saveRooms();
loadRooms();

}

/* ========= FINANCE ========= */

function loadFinance(){

const app=document.getElementById("app");

app.innerHTML=`
<div style="min-height:100vh;background:linear-gradient(135deg,#6a11cb,#2575fc);color:white;padding:20px">

<h2 style="text-align:center">💰 Finance System</h2>

<div style="max-width:500px;margin:auto;background:rgba(255,255,255,0.15);padding:20px;border-radius:20px">

<input id="billName" placeholder="Customer Name" style="width:100%;padding:10px;margin:5px 0">

<input id="billAmount" type="number" placeholder="Amount" style="width:100%;padding:10px;margin:5px 0">

<button onclick="addBill()" style="width:100%;padding:12px;background:#2ecc71;border:none;color:white">
Generate Bill
</button>

</div>

<h3 style="text-align:center;margin-top:30px">Bill List</h3>

<div id="billList" style="padding:20px"></div>

</div>
`;

loadBills();

}

function addBill(){

let name=document.getElementById("billName").value;
let amount=document.getElementById("billAmount").value;

if(!name || !amount){
alert("Fill bill data");
return;
}

bills.push({
id:Date.now(),
name,
amount
});

saveBills();
loadBills();

}

function loadBills(){

let list=document.getElementById("billList");
if(!list) return;

list.innerHTML="";

bills.forEach(b=>{

list.innerHTML+=`
<div style="background:rgba(255,255,255,0.2);
padding:15px;border-radius:10px;margin:10px">

👤 ${b.name} — 💰 ${b.amount}

<button onclick="deleteBill(${b.id})"
style="float:right;background:red;color:white;border:none;padding:5px 10px">
X
</button>

</div>
`;

});

}

function deleteBill(id){

bills=bills.filter(b=>b.id!==id);
saveBills();
loadBills();

}
