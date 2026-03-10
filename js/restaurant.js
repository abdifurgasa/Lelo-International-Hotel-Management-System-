// restaurant.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const foodMenuListEl = document.getElementById("foodMenuList");

// Add Food Item
export async function addFood() {
    const name = document.getElementById("foodName").value;
    const price = parseFloat(document.getElementById("foodPrice").value);
    const photo = document.getElementById("foodPhoto").files[0];

    if (!name || !price || !photo) return alert("Fill all fields");

    const photoURL = URL.createObjectURL(photo);

    await addDoc(collection(db, "foods"), {
        name, price, photoURL
    });

    loadFoodMenu();
}

// Load Food Menu
export async function loadFoodMenu() {
    foodMenuListEl.innerHTML = "";
    const snapshot = await getDocs(collection(db, "foods"));
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const card = document.createElement("div");
        card.className = "cardItem";
        card.innerHTML = `
            <img src="${data.photoURL}" alt="${data.name}">
            <h4>${data.name}</h4>
            <p>Price: $${data.price}</p>
        `;
        // Click to order
        card.addEventListener("click", () => orderFood(docSnap.id, data));
        foodMenuListEl.appendChild(card);
    });
}

// Order Food
async function orderFood(id, food) {
    const confirmOrder = confirm(`Order ${food.name} for $${food.price}?`);
    if (!confirmOrder) return;

    const guestUser = "guest_service"; // guest service user id/email

    await addDoc(collection(db, "billing"), {
        user: guestUser,
        item: food.name,
        type: "food",
        price: food.price,
        status: "Pending",
        paymentMethod: "",
        timestamp: new Date()
    });

    alert("Food ordered! Added to Guest Service Billing.");
}
