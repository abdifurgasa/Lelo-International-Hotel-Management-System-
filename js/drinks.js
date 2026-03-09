import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Load drinks
export async function loadDrinks() {
    const drinkList = document.getElementById("drinkMenuList");
    drinkList.innerHTML = "";
    const drinksSnap = await getDocs(collection(db, "drinks"));

    drinksSnap.forEach(drink => {
        const data = drink.data();
        const card = document.createElement("div");
        card.className = "cardItem";
        card.innerHTML = `
            <img src="${data.photo || 'https://via.placeholder.com/180'}" />
            <h4>${data.name}</h4>
            <p>$${data.price}</p>
        `;
        // Click to order
        card.addEventListener("click", async () => {
            await addDoc(collection(db, "billing"), {
                guest: "Guest",
                type: "drink",
                item: data.name,
                price: data.price,
                status: "Pending",
                payment: "Cash",
                date: new Date().toISOString()
            });
            alert(`${data.name} ordered!`);
        });
        drinkList.appendChild(card);
    });
}

// Add Drink
export async function addDrink() {
    const name = document.getElementById("drinkName").value;
    const price = parseFloat(document.getElementById("drinkPrice").value);
    const photo = document.getElementById("drinkPhoto").files[0] ? URL.createObjectURL(document.getElementById("drinkPhoto").files[0]) : '';

    if (!name || !price) return alert("Fill all fields");

    await addDoc(collection(db, "drinks"), { name, price, photo });
    alert("Drink added!");
    loadDrinks();
}
