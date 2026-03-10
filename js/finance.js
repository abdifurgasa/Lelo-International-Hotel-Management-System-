import { db } from "./firebase.js"; // Firebase config
import { setLanguage } from "./i18n.js";

// DOM elements
const totalRevenueEl = document.getElementById("totalRevenue");
const roomRevenueEl = document.getElementById("roomRevenue");
const foodRevenueEl = document.getElementById("foodRevenue");
const drinkRevenueEl = document.getElementById("drinkRevenue");
const revenueChartEl = document.getElementById("revenueChart");

let chartInstance = null;

// ==================== FETCH REVENUE ====================
async function fetchRevenue() {
    // Fetch finance document
    const doc = await db.collection("finance").doc("revenue").get();
    const data = doc.exists ? doc.data() : { rooms:0, food:0, drinks:0 };

    const total = (data.rooms||0) + (data.food||0) + (data.drinks||0);

    totalRevenueEl.innerText = total.toFixed(2);
    roomRevenueEl.innerText = (data.rooms||0).toFixed(2);
    foodRevenueEl.innerText = (data.food||0).toFixed(2);
    drinkRevenueEl.innerText = (data.drinks||0).toFixed(2);

    renderChart(data);
}

// ==================== RENDER CHART ====================
function renderChart(data) {
    const ctx = revenueChartEl.getContext("2d");
    if(chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Rooms', 'Food', 'Drinks'],
            datasets: [{
                label: 'Revenue',
                data: [data.rooms||0, data.food||0, data.drinks||0],
                backgroundColor: [
                    'rgba(30,144,255,0.7)',
                    'rgba(255,165,0,0.7)',
                    'rgba(138,43,226,0.7)'
                ],
                borderColor: [
                    'rgba(30,144,255,1)',
                    'rgba(255,165,0,1)',
                    'rgba(138,43,226,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Revenue Breakdown' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// ==================== LISTEN TO BILLING CHANGES ====================
db.collection("bills").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === "added" || change.type === "modified") {
            const bill = change.doc.data();
            if(bill.status === "Paid") {
                // Increment finance revenue
                db.collection("finance").doc("revenue").set({
                    [bill.type.toLowerCase()]: firebase.firestore.FieldValue.increment(bill.price)
                }, { merge: true });
            }
        }
    });
    fetchRevenue();
});

// ==================== INITIAL LOAD ====================
fetchRevenue();
