let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

function saveRooms(){
    localStorage.setItem("rooms", JSON.stringify(rooms));
}
