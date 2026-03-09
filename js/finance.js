import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
LOAD FINANCE DATA
=============================== */
window.loadFinance = async function() {
    try {
        const billingSnap = await getDocs(collection(db, "billing"));

        let roomRevenue = 0;
        let foodRevenue = 0;
        let drinkRevenue = 0;

        billingSnap.forEach(docSnap => {
            const bill = docSnap.data();
            if(bill.status !== "Paid") return;

            switch(bill.itemType) {
                case "room": roomRevenue += bill.price; break;
                case "food": foodRevenue += bill.price; break;
                case "drink": drinkRevenue += bill.price; break;
            }
        });

        const totalRevenue = roomRevenue + foodRevenue + drinkRevenue;

        // Update cards
        document.getElementById("totalRevenue").innerText = `$${totalRevenue}`;
        document.getElementById("roomRevenue").innerText = `$${roomRevenue}`;
        document.getElementById("foodRevenue").innerText = `$${foodRevenue}`;
        document.getElementById("drinkRevenue").innerText = `$${drinkRevenue}`;

        // Render chart
        const ctx = document.getElementById("revenueChart").getContext("2d");
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Room', 'Food', 'Drink'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [roomRevenue, foodRevenue, drinkRevenue],
                    backgroundColor: ['#4caf50', '#ff9800', '#2196f3']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Revenue Breakdown' }
                }
            }
        });

    } catch (err) {
        console.log("Load finance error:", err);
    }
};

/* ===============================
AUTO LOAD FINANCE
=============================== */
loadFinance();
