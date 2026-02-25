function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(135deg,green,purple);color:white;padding:20px;">
            <h1>Lelo International Hotel Management System</h1>

            <button onclick="loadRooms()" style="padding:10px;margin-right:10px;">Manage Rooms</button>
            <button onclick="loadLogin()" style="padding:10px;">Logout</button>

            <div id="content" style="margin-top:20px;"></div>
        </div>
    `;
}
function loadRooms() {
    const content = document.getElementById("content");
    const rooms = getRooms();

    content.innerHTML = `
        <h2>Room Management</h2>

        <input id="roomNumber" placeholder="Room Number" />
        <input id="roomType" placeholder="Room Type" />
        <input id="roomPrice" placeholder="Price" />
        <button onclick="addRoom()">Add Room</button>

        <hr/>

        <div id="roomList"></div>
    `;

    displayRooms();
}

function addRoom() {
    const number = document.getElementById("roomNumber").value;
    const type = document.getElementById("roomType").value;
    const price = document.getElementById("roomPrice").value;

    if (!number || !type || !price) {
        alert("Fill all fields");
        return;
    }

    const rooms = getRooms();
    rooms.push({
        number,
        type,
        price,
        status: "Available"
    });

    saveRooms(rooms);
    loadRooms();
}

function displayRooms() {
    const rooms = getRooms();
    const roomList = document.getElementById("roomList");

    roomList.innerHTML = rooms.map(room => `
        <div style="background:white;color:black;padding:10px;margin:5px 0;">
            Room ${room.number} | ${room.type} | $${room.price} | ${room.status}
        </div>
    `).join("");
}
