// drinks.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { addBill } from "./billingHelper.js";

const drinkMenuListEl = document.getElementById("drinkMenuList");

// Add Drink
export async function addDrink() {
    const name = document.getElementById("drinkName").value;
    const price = parseFloat(document.getElementById("drinkPrice").value);
    const photo = document.getElementById("drinkPhoto").files[0];

    if (!name || !price || !photo) return alert("Fill all fields");

    const photoURL = URL.createObjectURL(photo);

    await addDoc(collection(db, "drinks"), {
        name,
        price,
        photoURL
    });

    loadDrinkMenu();
}

// Load Drinks Menu
export async function loadDrinkMenu() {
    drinkMenuListEl.innerHTML = "";
    const snapshot = await getDocs(collection(db, "drinks"));
    snapshot.forEach(docSnap => {
        const drink = docSnap.data();
        const card = document.createElement("div");
        card.className = "cardItem";
        card.innerHTML = `
            <img src="${drink.photoURL}" alt="${drink.name}">
            <h4>${drink.name}</h4>
            <p>Price: $${drink.price}</p>
        `;
        // Click to order
        card.addEventListener("click", async () => {
            await addBill("guest_service", drink.name, "drink", drink.price);
            alert(`${drink.name} ordered. Bill added to Guest Service.`);
        });
        drinkMenuListEl.appendChild(card);
    });
}
