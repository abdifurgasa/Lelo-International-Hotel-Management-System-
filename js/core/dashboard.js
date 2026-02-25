function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(135deg,green,purple);color:white;padding:20px;padding-bottom:50px;">
            <h1>Lelo International Hotel Management System</h1>

            <button onclick="loadRooms()" style="padding:10px;margin-right:10px;">Manage Rooms</button>
            <button onclick="loadLogin()" style="padding:10px;">Logout</button>

            <div id="content" style="margin-top:20px;"></div>
        </div>
    `;
}

function loadRooms() {
    document.getElementById("content").innerHTML = `
        <h2>Room Management</h2>

        <input id="roomNumber" placeholder="Room Number"/>

        <select id="roomType" onchange="setAutoPrice()">
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Smart">Smart</option>
            <option value="VIP">VIP</option>
        </select>

        <input id="roomPrice" placeholder="Price" readonly/>

        <input type="file" id="roomPhoto" accept="image/*"/>

        <button onclick="addRoom()">Add Room</button>

        <hr/>

        <div id="roomList"></div>
    `;

    displayRooms();
}

function setAutoPrice() {
    const type = document.getElementById("roomType").value;

    const prices = {
        Single: 80,
        Double: 120,
        Deluxe: 180,
        Smart: 200,
        VIP: 300
    };

    document.getElementById("roomPrice").value = prices[type] || "";
}

function addRoom() {
    const number = document.getElementById("roomNumber").value;
    const type = document.getElementById("roomType").value;
    const price = document.getElementById("roomPrice").value;
    const photoFile = document.getElementById("roomPhoto").files[0];

    if (!number || !type || !price || !photoFile) {
        alert("Fill all fields including photo");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const rooms = getRooms();

        rooms.push({
            number,
            type,
            price,
            photo: reader.result,
            status: "Available"
        });

        saveRooms(rooms);
        loadRooms();
    };

    reader.readAsDataURL(photoFile);
}

function displayRooms() {
    const rooms = getRooms();
    const roomList = document.getElementById("roomList");

    if (!rooms.length) {
        roomList.innerHTML = "No rooms added yet.";
        return;
    }

    roomList.innerHTML = rooms.map((room, index) => `
        <div style="background:white;color:black;padding:15px;margin:10px 0;border-radius:10px;">
            <img src="${room.photo}" style="width:120px;height:80px;object-fit:cover;display:block;margin-bottom:10px;"/>

            Room ${room.number} | ${room.type} | $${room.price} |
            <strong>${room.status}</strong>

            <br/>

            <button onclick="toggleStatus(${index})">
                Toggle Status
            </button>

            <button onclick="deleteRoom(${index})" style="background:red;color:white;margin-left:10px;">
                Delete
            </button>
        </div>
    `).join("");
}

function toggleStatus(index) {
    const rooms = getRooms();

    rooms[index].status =
        rooms[index].status === "Available"
            ? "Occupied"
            : "Available";

    saveRooms(rooms);
    loadRooms();
}

function deleteRoom(index) {
    const rooms = getRooms();
    rooms.splice(index, 1);
    saveRooms(rooms);
    loadRooms();
}
