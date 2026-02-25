let rooms = JSON.parse(localStorage.getItem("rooms")||"[]");
let bills = JSON.parse(localStorage.getItem("bills")||"[]");
let menus = JSON.parse(localStorage.getItem("menus")||"[]");

function saveAll(){
localStorage.setItem("rooms",JSON.stringify(rooms));
localStorage.setItem("bills",JSON.stringify(bills));
localStorage.setItem("menus",JSON.stringify(menus));
}
