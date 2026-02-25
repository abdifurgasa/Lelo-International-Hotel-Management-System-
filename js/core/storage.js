let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
let bills = JSON.parse(localStorage.getItem("bills") || "[]");

function saveRooms(){
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

function saveBills(){
    localStorage.setItem("bills", JSON.stringify(bills));
}
