function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="min-height:100vh;
        background:linear-gradient(135deg,#0f9b0f,#6a0dad);
        padding:40px;
        color:white;
        font-family:Arial;">

            <div style="
                max-width:800px;
                margin:auto;
                background:rgba(255,255,255,0.1);
                backdrop-filter:blur(10px);
                border-radius:25px;
                padding:40px;
                box-shadow:0 0 25px rgba(0,0,0,0.3);
                text-align:center;
            ">

                <h1 style="margin-bottom:30px;">
                    🏨 Lelo International Hotel Dashboard
                </h1>

                <p style="font-size:18px;margin-bottom:30px;">
                    Welcome to your smart hotel management system
                </p>

                <div style="display:grid;gap:15px;">

                    <button onclick="loadRooms()" style="padding:15px;border:none;border-radius:15px;font-size:16px;cursor:pointer;">
                        Manage Rooms
                    </button>

                    <button onclick="loadLogin()" style="padding:15px;border:none;border-radius:15px;font-size:16px;cursor:pointer;">
                        Logout
                    </button>

                </div>

                <div id="content" style="
                    margin-top:40px;
                    text-align:left;
                    background:white;
                    color:black;
                    padding:25px;
                    border-radius:20px;
                    min-height:200px;
                ">
                </div>

            </div>
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
        displayRooms();
    };

    reader.readAsDataURL(photoFile);
}

function displayRooms() {
    const rooms = getRooms();
    const roomList = document.getElementById("roomList");

    if (!roomList) return;

    if (!rooms.length) {
        roomList.innerHTML = "No rooms added yet.";
        return;
    }

    roomList.innerHTML = rooms.map((room, index) => `
        <div style="background:#f9f9f9;
        color:black;
        padding:15px;
        margin:10px 0;
        border-radius:15px;
        box-shadow:0 0 5px rgba(0,0,0,0.1);">

            <img src="${room.photo}"
            style="width:120px;height:80px;object-fit:cover;border-radius:10px;"/>

            <p>
                Room ${room.number} |
                ${room.type} |
                $${room.price} |
                <strong>${room.status}</strong>
            </p>

            <button onclick="toggleStatus(${index})">
                Toggle Status
            </button>

            <button onclick="deleteRoom(${index})"
            style="background:red;color:white;margin-left:10px;">
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
    displayRooms();
}

function deleteRoom(index) {
    const rooms = getRooms();

    rooms.splice(index, 1);

    saveRooms(rooms);
    displayRooms();
}
