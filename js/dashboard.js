// =========================
// IMPORT FIREBASE
// =========================
import { auth, db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =========================
// WAIT FOR DOM
// =========================
document.addEventListener("DOMContentLoaded", () => {

    // Wait for Firebase auth
    auth.onAuthStateChanged(async (user) => {

        if (!user) {
            window.location = "index.html";
            return;
        }

        // User is logged in
        try {

            const q = query(collection(db, "users"), where("email", "==", user.email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                alert("Access denied");
                return;
            }

            const role = snapshot.docs[0].data().role;

            // Initialize menu toggle
            const dashboardTitle = document.getElementById("dashboardMenu");
            const dashboardSubmenu = document.getElementById("dashboardSubmenu");
            dashboardTitle.addEventListener("click", e => {
                e.stopPropagation();
                dashboardSubmenu.style.display = dashboardSubmenu.style.display === "block" ? "none" : "block";
            });
            document.addEventListener("click", e => {
                if (!dashboardTitle.contains(e.target) && !dashboardSubmenu.contains(e.target)) {
                    dashboardSubmenu.style.display = "none";
                }
            });

            // Logout button
            const logoutBtn = document.querySelector(".logoutBtn");
            logoutBtn.addEventListener("click", () => {
                if (confirm("Logout?")) {
                    auth.signOut().then(() => window.location = "index.html");
                }
            });

            // Load dashboard page
            await loadPage("dashboard", role);

        } catch (err) {
            console.log("Auth error:", err);
        }

    });

});

// =========================
// LOAD PAGE
// =========================
async function loadPage(pageId, role = "staff") {

    document.querySelectorAll(".page").forEach(p => p.style.display = "none");

    // Manager-only pages
    const managerPages = ["staffPage"];
    if (role !== "manager" && managerPages.includes(pageId)) {
        alert("Only manager allowed");
        return;
    }

    const page = document.getElementById(pageId);
    if (page) page.style.display = "block";

    if (pageId === "dashboard") await loadDashboardStats();
}

// =========================
// DASHBOARD STATS
// =========================
async function loadDashboardStats() {
    try {
        const roomsSnap = await getDocs(collection(db, "rooms"));
        const totalRooms = roomsSnap.size;
        let occupiedRooms = 0;
        roomsSnap.forEach(r => { if (r.data().status === "Occupied") occupiedRooms++; });

        const foodsSnap = await getDocs(collection(db, "foods"));
        const drinksSnap = await getDocs(collection(db, "drinks"));

        const totalFoods = foodsSnap.size;
        const totalDrinks = drinksSnap.size;

        document.getElementById("totalRooms").innerText = totalRooms;
        document.getElementById("occupiedRooms").innerText = occupiedRooms;
        document.getElementById("totalFoods").innerText = totalFoods;
        document.getElementById("totalDrinks").innerText = totalDrinks;

        document.getElementById("todayDate").innerText = new Date().toLocaleDateString();

        loadRevenueChart(totalRooms, totalFoods, totalDrinks);

    } catch (err) {
        console.log("Dashboard error:", err);
    }
}

// =========================
// REVENUE CHART
// =========================
function loadRevenueChart(roomsRevenue, foodRevenue, drinkRevenue) {
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
            plugins: { legend: { display: false } }
        }
    });
}
