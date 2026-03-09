// =========================
// IMPORT FIREBASE
// =========================
import { auth, db } from "./firebase.js";
import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =========================
// WAIT FOR AUTH STATE
// =========================
auth.onAuthStateChanged(async (user) => {

    if (!user) {
        // Not logged in → redirect
        window.location = "index.html";
        return;
    }

    try {
        // Get user role
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            alert("Access denied");
            return;
        }

        const role = snapshot.docs[0].data().role;

        // If staff tries to open manager page → deny
        if (role !== "manager") {
            const staffPages = ["staffPage"];
            staffPages.forEach(page => {
                const el = document.getElementById(page);
                if (el) el.style.display = "none";
            });
        }

        // Load dashboard automatically
        loadPage("dashboard");

    } catch (err) {
        console.log("Auth error:", err);
    }
});

// =========================
// LOAD PAGE FUNCTION
// =========================
window.loadPage = async function(pageId) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");

    // Show selected page
    const page = document.getElementById(pageId);
    if (page) page.style.display = "block";

    // Call specific loaders
    if (pageId === "dashboard") loadDashboardStats();
    if (pageId === "staffPage" && typeof loadStaff === "function") loadStaff();
    if (pageId === "orderPage") {
        if (typeof loadOrders === "function") loadOrders();
    }
    if (pageId === "restaurant" && typeof loadFoods === "function") loadFoods();
    if (pageId === "drinks" && typeof loadDrinks === "function") loadDrinks();
    if (pageId === "finance" && typeof loadFinance === "function") loadFinance();
};

// =========================
// DASHBOARD STATS
// =========================
async function loadDashboardStats() {
    try {
        // Rooms
        const roomsSnap = await getDocs(collection(db, "rooms"));
        const totalRooms = roomsSnap.size;
        let occupiedRooms = 0;
        roomsSnap.forEach(r => {
            if (r.data().status === "Occupied") occupiedRooms++;
        });

        // Foods & Drinks
        const foodsSnap = await getDocs(collection(db, "foods"));
        const drinksSnap = await getDocs(collection(db, "drinks"));
        const totalFoods = foodsSnap.size;
        const totalDrinks = drinksSnap.size;

        // Billing for today
        const billingSnap = await getDocs(collection(db, "billing"));
        let todayRevenue = 0;
        const today = new Date().toISOString().split('T')[0];

        billingSnap.forEach(doc => {
            const data = doc.data();
            const date = data.date ? data.date.split('T')[0] : null;
            if (date === today) {
                todayRevenue += data.price || 0;
            }
        });

        // Update UI
        if (document.getElementById("totalRooms")) document.getElementById("totalRooms").innerText = totalRooms;
        if (document.getElementById("occupiedRooms")) document.getElementById("occupiedRooms").innerText = occupiedRooms;
        if (document.getElementById("totalFoods")) document.getElementById("totalFoods").innerText = totalFoods;
        if (document.getElementById("totalDrinks")) document.getElementById("totalDrinks").innerText = totalDrinks;

        // Show today's date
        const todayDateEl = document.getElementById("todayDate");
        if (todayDateEl) {
            todayDateEl.innerText = new Date().toLocaleDateString();
        }

        // Load chart
        loadRevenueChart(todayRevenue, totalFoods, totalDrinks);

    } catch (err) {
        console.log("Dashboard error:", err);
    }
}

// =========================
// REVENUE CHART
// =========================
function loadRevenueChart(roomsRevenue = 0, foodRevenue = 0, drinkRevenue = 0) {
    const ctx = document.getElementById("revenueChart");
    if (!ctx) return;

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Rooms", "Food", "Drinks"],
            datasets: [{
                label: "Revenue",
                data: [roomsRevenue, foodRevenue, drinkRevenue],
                backgroundColor: ["#444", "#d2691e", "#6a5acd"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// =========================
// LOGOUT
// =========================
window.logout = function() {
    if (confirm("Logout?")) {
        auth.signOut().then(() => window.location = "index.html");
    }
};

// =========================
// DASHBOARD MENU TOGGLE
// =========================
const dashboardTitle = document.getElementById("dashboardMenu");
const dashboardSubmenu = document.getElementById("dashboardSubmenu");

dashboardTitle.addEventListener("click", function(e){
    e.stopPropagation();
    dashboardSubmenu.style.display = dashboardSubmenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function(e){
    if(!dashboardTitle.contains(e.target) && !dashboardSubmenu.contains(e.target)){
        dashboardSubmenu.style.display = "none";
    }
});
