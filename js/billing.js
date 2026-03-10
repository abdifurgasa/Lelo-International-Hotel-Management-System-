// billing.js
import { db } from "./firebase.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { loadFinance, updateFinance } from "./finance.js";

const billingListEl = document.getElementById("billingList");

// Load all bills
export async function loadBilling() {
    billingListEl.innerHTML = "";
    const snapshot = await getDocs(collection(db, "billing"));
    snapshot.forEach(docSnap => {
        const bill = docSnap.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${bill.user}</td>
            <td>${bill.item}</td>
            <td>${bill.type}</td>
            <td>$${bill.price}</td>
            <td>${bill.status}</td>
            <td>
                <select id="paymentMethod_${docSnap.id}">
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </td>
            <td>
                <button onclick="payBill('${docSnap.id}', ${bill.price})">Pay</button>
            </td>
        `;
        billingListEl.appendChild(tr);
    });
}

// Pay a bill
export async function payBill(billId, amount) {
    const selectEl = document.getElementById(`paymentMethod_${billId}`);
    const method = selectEl.value;
    if (!method) return alert("Please select payment method");

    const billRef = doc(db, "billing", billId);

    // Update bill status and payment method
    await updateDoc(billRef, {
        status: "Paid",
        paymentMethod: method
    });

    // Update Finance module
    await updateFinance(amount, method);

    alert("Bill paid! Finance updated.");
    loadBilling();
}
