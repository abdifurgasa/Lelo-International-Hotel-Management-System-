// drinks.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const drinkMenuListEl = document.getElementById("drinkMenuList");

// Add Drink
export async function addDrink() {
    const name = document.getElementById("drinkName").value;
    const price = parseFloat(document.getElementById("drinkPrice").value);
    const photo = document.getElementById("drinkPhoto").files[0];

    if (!name || !price || !photo) return alert("Fill all fields");

    const photoURL = URL.createObjectURL(photo);

    await addDoc(collection(db, "drinks"), {
        name, price, photoURL
    });

    loadDrinkMenu();
}

// Load Drinks Menu
export async function loadDrinkMenu() {
    drinkMenuListEl.innerHTML = "";
    const snapshot = await getDocs(collection(db, "drinks"));
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
        card.addEventListener("click", () => orderDrink(docSnap.id, data));
        drinkMenuListEl.appendChild(card);
    });
}

// Order Drink
async function orderDrink(id, drink) {
    const confirmOrder = confirm(`Order ${drink.name} for $${drink.price}?`);
    if (!confirmOrder) return;

    const guestUser = "guest_service"; // guest service user id/email

    await addDoc(collection(db, "billing"), {
        user: guestUser,
        item: drink.name,
        type: "drink",
        price: drink.price,
        status: "Pending",
        paymentMethod: "",
        timestamp: new Date()
    });

    alert("Drink ordered! Added to Guest Service Billing.");
}
