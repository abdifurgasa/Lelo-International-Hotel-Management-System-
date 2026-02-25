let rooms=[];
let menus=[];
let bills=[];
let bookings=[];
let users=[];

function loadDatabase(){

rooms=JSON.parse(localStorage.getItem("rooms")||"[]");
menus=JSON.parse(localStorage.getItem("menus")||"[]");
bills=JSON.parse(localStorage.getItem("bills")||"[]");
users=JSON.parse(localStorage.getItem("users")||"[]");
bookings=JSON.parse(localStorage.getItem("bookings")||"[]");

}

function saveDatabase(){

localStorage.setItem("rooms",JSON.stringify(rooms));
localStorage.setItem("menus",JSON.stringify(menus));
localStorage.setItem("bills",JSON.stringify(bills));
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("bookings",JSON.stringify(bookings));

}

loadDatabase();
