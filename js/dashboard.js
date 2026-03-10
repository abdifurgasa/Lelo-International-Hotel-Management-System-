// dashboard.js
import { db } from './firebase.js'; // make sure your firebase.js exports 'db'
import { collection, getDocs, query, where } from "firebase/firestore";

// --------------------------
// PAGE SWITCHING
// --------------------------
const pages = document.querySelectorAll(".page");
function loadPage(pageId) {
    pages.forEach(p => p.style.display = "none");
    const page = document.getElementById(pageId);
    if (page) page.style.display = "block";
}

// --------------------------
// DASHBOARD SUBMENU TOGGLE
// --------------------------
const dashboardTitle = document.querySelector(".menuTitle");
const dashboardSubmenu = document.querySelector(".submenu");

dashboardTitle.addEventListener("click", (e) => {
    e.stopPropagation();
    dashboardSubmenu.style.display = dashboardSubmenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
    dashboardSubmenu.style.display = "none";
});

// --------------------------
// STATS UPDATE
// --------------------------
async function updateStats() {
    // Total Rooms
    const roomsSnapshot = await getDocs(collection(db, "rooms"));
    const totalRooms = roomsSnapshot.size;
    document.getElementById("totalRooms").innerText = totalRooms;

    // Occupied Rooms
    const occupiedRooms = roomsSnapshot.docs.filter(doc => doc.data().status === "occupied").length;
    document.getElementById("occupiedRooms").innerText = occupiedRooms;

    // Today Orders (Food + Drink)
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = ordersSnapshot.docs.filter(doc => doc.data().date === today).length;
    document.getElementById("totalFoods").innerText = todayOrders; // for simplicity combining food+drink
    document.getElementById("totalDrinks").innerText = todayOrders;

    // Today Revenue
    const todayRevenue = ordersSnapshot.docs
        .filter(doc => doc.data().date === today)
        .reduce((sum, doc) => sum + parseFloat(doc.data().price || 0), 0);
    document.getElementById("totalRevenue").innerText = todayRevenue.toFixed(2);
}

// Call stats update on load
updateStats();

// --------------------------
// LOGOUT
// --------------------------
window.logout = function() {
    if (confirm("Are you sure you want to logout?")) {
        // Firebase sign out
        import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js').then(({ getAuth, signOut }) => {
            const auth = getAuth();
            signOut(auth).then(() => {
                window.location.href = "login.html";
            }).catch(err => alert(err.message));
        });
    }
}

// --------------------------
// PAGE ONLOAD
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Show dashboard by default
    loadPage('dashboard');

    // Set today's date
    const todayDateElem = document.getElementById("todayDate");
    const now = new Date();
    todayDateElem.innerText = now.toLocaleDateString();
});

// --------------------------
// EXPORT
// --------------------------
export { loadPage, updateStats };
