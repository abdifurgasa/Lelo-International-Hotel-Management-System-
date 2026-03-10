// roleDashboard.js
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const sidebarItems = {
    dashboard: document.querySelector(".menuTitle"),
    rooms: document.querySelector("li[onclick*='rooms']"),
    orderPage: document.querySelector("li[onclick*='orderPage']"),
    billing: document.querySelector("li[onclick*='billing']"),
    restaurant: document.querySelector("li[onclick*='restaurant']"),
    drinks: document.querySelector("li[onclick*='drinks']"),
    staffPage: document.querySelector("li[onclick*='staffPage']"),
    finance: document.querySelector("li[onclick*='finance']")
};

// Assume user is logged in
export async function loadRoleDashboard(userId) {
    const userDoc = await getDoc(doc(db, "staff", userId));
    if (!userDoc.exists()) return alert("User not found");
    
    const user = userDoc.data();
    const role = user.role;

    // First hide everything
    Object.values(sidebarItems).forEach(item => item.style.display = "none");

    // Manager sees all
    if (role === "manager") {
        Object.values(sidebarItems).forEach(item => item.style.display = "block");
        return;
    }

    // Other roles permissions
    if (role === "reception") {
        sidebarItems.dashboard.style.display = "block";
        sidebarItems.rooms.style.display = "block";
        sidebarItems.billing.style.display = "block";
    }
    if (role === "kitchen") {
        sidebarItems.dashboard.style.display = "block";
        sidebarItems.restaurant.style.display = "block";
    }
    if (role === "barman") {
        sidebarItems.dashboard.style.display = "block";
        sidebarItems.drinks.style.display = "block";
    }
    if (role === "worker") {
        sidebarItems.dashboard.style.display = "block";
    }
}
