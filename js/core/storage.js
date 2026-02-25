let rooms=[];
let menus=[];
let bills=[];
let bookings=[];

function loadStorage(){

rooms=JSON.parse(localStorage.getItem("rooms")||"[]");
menus=JSON.parse(localStorage.getItem("menus")||"[]");
bills=JSON.parse(localStorage.getItem("bills")||"[]");
bookings=JSON.parse(localStorage.getItem("bookings")||"[]");

}

function saveAll(){

localStorage.setItem("rooms",JSON.stringify(rooms));
localStorage.setItem("menus",JSON.stringify(menus));
localStorage.setItem("bills",JSON.stringify(bills));
localStorage.setItem("bookings",JSON.stringify(bookings));

}

loadStorage();
