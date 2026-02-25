function getRooms() {
    return JSON.parse(localStorage.getItem("rooms")) || [];
}

function saveRooms(rooms) {
    localStorage.setItem("rooms", JSON.stringify(rooms));
}
