// rooms.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { updateFinance } from "./finance.js"; // import finance

const roomListEl = document.getElementById("roomList");

export async function addRoom() {
    const number = document.getElementById("roomNumber").value;
    const type = document.getElementById("roomType").value;
    const price = parseFloat(document.getElementById("roomPrice").value);
    const photo = document.getElementById("roomPhoto").files[0];

    if(!number || !type || !price || !photo) return alert("Fill all fields");

    // Upload photo to Firebase Storage (optional, simplified as URL for now)
    const photoURL = URL.createObjectURL(photo);

    await addDoc(collection(db, "rooms"), {
        number, type, price, photoURL, status: "Available"
    });

    loadRooms();
}

// Load all rooms
export async function loadRooms() {
    roomListEl.innerHTML = "";
    const snapshot = await getDocs(collection(db, "rooms"));
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const card = document.createElement("div");
        card.className = "cardItem";
        card.innerHTML = `
            <img src="${data.photoURL}" alt="${data.type}">
            <h4>${data.type} - ${data.number}</h4>
            <p>Price: $${data.price}</p>
            <p>Status: ${data.status}</p>
        `;
        // Click to book
        card.addEventListener("click", () => bookRoom(docSnap.id, data));
        roomListEl.appendChild(card);
    });
}

// Book room function
async function bookRoom(id, room) {
    if(room.status === "Occupied") return alert("Room already booked");

    const confirmBooking = confirm(`Book ${room.type} Room #${room.number} for $${room.price}?`);
    if(!confirmBooking) return;

    // Add to Guest Service billing
    const guestUser = "guest_service"; // your guest services user id/email
    await addDoc(collection(db, "billing"), {
        user: guestUser,
        item: `${room.type} Room #${room.number}`,
        type: "room",
        price: room.price,
        status: "Pending",
        paymentMethod: "",
        timestamp: new Date()
    });

    // Mark room as occupied
    const roomRef = doc(db, "rooms", id);
    await updateDoc(roomRef, { status: "Occupied" });

    alert("Room booked! Added to Guest Service Billing.");

    // Reload rooms
    loadRooms();
}
