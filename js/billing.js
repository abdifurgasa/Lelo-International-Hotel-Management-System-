import { db } from './firebase.js';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { updateFinance } from './finance.js';
import { updateStats } from './dashboard.js';

const billingList = document.getElementById("billingList");

// Load all billing
export async function loadBilling() {
    billingList.innerHTML = "";
    const snapshot = await getDocs(collection(db, "billing"));

    snapshot.forEach(docSnap => {
        const bill = docSnap.data();
        const billId = docSnap.id;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${bill.guest}</td>
            <td>${bill.item}</td>
            <td>${bill.type}</td>
            <td>$${bill.price}</td>
            <td>${bill.status}</td>
            <td>${bill.paymentMethod ? bill.paymentMethod : "-"}</td>
            <td>
                ${bill.status === "unpaid" ? `<button onclick="payBill('${billId}')">Mark as Paid</button>` : ""}
            </td>
        `;

        billingList.appendChild(row);
    });
}

// Mark bill as paid
window.payBill = async function(billId) {
    const method = prompt("Enter payment method: cash or transfer").toLowerCase();
    if (!method || (method !== "cash" && method !== "transfer")) {
        alert("Invalid payment method. Use cash or transfer.");
        return;
    }

    try {
        const billRef = doc(db, "billing", billId);
        await updateDoc(billRef, {
            status: "paid",
            paymentMethod: method,
            paidDate: new Date().toISOString().split('T')[0]
        });

        alert("Bill marked as paid!");

        // Update finance module
        updateFinance();
        loadBilling();
        updateStats();

    } catch (err) {
        console.error(err);
        alert("Error marking bill as paid: " + err.message);
    }
};

// Initial load
document.addEventListener("DOMContentLoaded", loadBilling);
