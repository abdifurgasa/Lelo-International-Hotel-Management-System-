import { db, storage } from './firebase.js';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateStats } from './dashboard.js';

const roomList = document.getElementById("roomList");
const roomNumberInput = document.getElementById("roomNumber");
const roomTypeInput = document.getElementById("roomType");
const roomPriceInput = document.getElementById("roomPrice");
const roomPhotoInput = document.getElementById("roomPhoto");

// Add Room
window.addRoom = async function() {
    const number = roomNumberInput.value.trim();
    const type = roomTypeInput.value;
    const price = parseFloat(roomPriceInput.value);
    const file = roomPhotoInput.files[0];

    if (!number || !type || !price || !file) {
        alert("Please fill all fields and select a photo.");
        return;
    }

    try {
        const photoRef = ref(storage, `rooms/${file.name}_${Date.now()}`);
        await uploadBytes(photoRef, file);
        const photoURL = await getDownloadURL(photoRef);

        await addDoc(collection(db, "rooms"), {
            number,
            type,
            price,
            photoURL,
            status: "available"
        });

        roomNumberInput.value = "";
        roomPriceInput.value = "";
        roomPhotoInput.value = "";

        loadRooms();
        updateStats();

    } catch (err) {
        console.error(err);
        alert("Error adding room: " + err.message);
    }
};

// Load Rooms
export async function loadRooms() {
    roomList.innerHTML = "";
    const roomsSnapshot = await getDocs(collection(db, "rooms"));

    roomsSnapshot.forEach(docSnap => {
        const room = docSnap.data();
        const roomId = docSnap.id;

        const card = document.createElement("div");
        card.className = "cardItem"; // Wrapped card

        card.innerHTML = `
            <img src="${room.photoURL}" alt="Room ${room.number}">
            <h4>${room.type} - ${room.number}</h4>
            <p>Price: $${room.price}</p>
            <p>Status: <strong>${room.status}</strong></p>
            <button onclick="bookRoom('${roomId}', '${room.number}')">
                ${room.status === 'available' ? 'Book Room' : 'Check Out'}
            </button>
        `;

        roomList.appendChild(card);
    });
}

// Book Room / Check Out
window.bookRoom = async function(roomId, roomNumber) {
    const roomDocRef = doc(db, "rooms", roomId);
    const roomSnap = await getDocs(collection(db, "rooms"));

    const roomDoc = await getDocs(doc(db, "rooms", roomId));
    const room = (await getDocs(doc(db, "rooms", roomId))).data();

    if (!room) return;

    if (room.status === "available") {
        const guestName = prompt("Enter Guest Service Name for booking:");
        if (!guestName) return;

        await updateDoc(roomDocRef, { status: "occupied" });

        await addDoc(collection(db, "billing"), {
            guest: guestName,
            item: `Room ${room.number}`,
            type: "room",
            price: room.price,
            status: "unpaid",
            paymentMethod: null,
            date: new Date().toISOString().split('T')[0]
        });

        alert(`Room ${room.number} booked! Billing added for ${guestName}.`);
    } else {
        await updateDoc(roomDocRef, { status: "available" });
        alert(`Room ${room.number} is now available.`);
    }

    loadRooms();
    updateStats();
};

document.addEventListener("DOMContentLoaded", loadRooms);
