import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
LOAD ROOM LIST
=============================== */
window.loadRooms = async function() {
    const roomList = document.getElementById("roomList");
    if (!roomList) return;

    roomList.innerHTML = ""; // clear previous cards

    try {
        const roomsSnap = await getDocs(collection(db, "rooms"));
        roomsSnap.forEach(doc => {
            const room = doc.data();
            const div = document.createElement("div");
            div.className = "roomCard";

            div.innerHTML = `
                <img src="${room.photo || 'img/default-room.jpg'}" alt="Room">
                <h4>Room ${room.number}</h4>
                <p>Type: ${room.type}</p>
                <p>Price: $${room.price}</p>
            `;

            // Click to book
            div.onclick = () => bookRoom(doc.id, room);
            roomList.appendChild(div);
        });
    } catch (err) {
        console.log("Load rooms error:", err);
    }
};

/* ===============================
ADD ROOM
=============================== */
window.addRoom = async function() {
    const number = document.getElementById("roomNumber").value.trim();
    const type = document.getElementById("roomType").value;
    const price = document.getElementById("roomPrice").value;
    const photoInput = document.getElementById("roomPhoto");

    if (!number || !type || !price) {
        alert("Please fill all fields");
        return;
    }

    let photoUrl = "";
    if (photoInput && photoInput.files.length > 0) {
        const file = photoInput.files[0];
        photoUrl = await toBase64(file);
    }

    try {
        await addDoc(collection(db, "rooms"), {
            number,
            type,
            price: Number(price),
            photo: photoUrl,
            status: "Available"
        });

        alert("Room added successfully!");
        document.getElementById("roomNumber").value = "";
        document.getElementById("roomPrice").value = "";
        photoInput.value = "";

        loadRooms();
    } catch (err) {
        console.log(err);
        alert("Failed to add room");
    }
};

/* ===============================
BOOK ROOM
=============================== */
async function bookRoom(roomId, roomData) {
    const guest = prompt("Guest Name / Email?");
    if (!guest) return;

    try {
        await addDoc(collection(db, "billing"), {
            itemId: roomId,
            itemType: "room",
            name: `Room ${roomData.number}`,
            price: roomData.price,
            guest: guest,
            status: "Pending"
        });

        alert("Room booked! Billing added.");
    } catch (err) {
        console.log(err);
        alert("Booking failed");
    }
}

/* ===============================
HELPER: convert photo to Base64
=============================== */
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/* ===============================
AUTO LOAD ROOM LIST
=============================== */
loadRooms();
