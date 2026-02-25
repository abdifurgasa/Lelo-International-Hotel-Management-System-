let rooms = JSON.parse(localStorage.getItem("rooms")||"[]");
let menus = JSON.parse(localStorage.getItem("menus")||"[]");
let bills = JSON.parse(localStorage.getItem("bills")||"[]");
let users = JSON.parse(localStorage.getItem("users")||"[]");
let bookings = JSON.parse(localStorage.getItem("bookings")||"[]");

function saveDatabase(){
localStorage.setItem("rooms",JSON.stringify(rooms));
localStorage.setItem("menus",JSON.stringify(menus));
localStorage.setItem("bills",JSON.stringify(bills));
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("bookings",JSON.stringify(bookings));
}
