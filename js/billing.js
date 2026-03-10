// billing.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { updateFinance } from "./finance.js"; // function to update finance totals

const billingList = document.getElementById("billingList");

/**
 * Add item to Guest Service bill
 * @param {string} userEmail - Email of Guest Service
 * @param {object} item - { type, name, price, id }
 */
export async function addToBill(userEmail, item) {
    try {
        await addDoc(collection(db, "bills"), {
            user: userEmail,
            itemType: item.type,
            itemName: item.name,
            price: item.price,
            status: "Pending",
            paymentMethod: null,
            timestamp: serverTimestamp()
        });
        loadBills(userEmail);
    } catch (error) {
        console.error("Error adding bill: ", error);
    }
}

/**
 * Load bills for a specific user
 * @param {string} userEmail
 */
export async function loadBills(userEmail = "guestService@example.com") {
    billingList.innerHTML = "";
    const snapshot = await getDocs(collection(db, "bills"));
    snapshot.forEach(docSnap => {
        const bill = docSnap.data();
        if (bill.user === userEmail) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${bill.user}</td>
                <td>${bill.itemName}</td>
                <td>${bill.itemType}</td>
                <td>$${bill.price}</td>
                <td>${bill.status}</td>
                <td>
                    <select onchange="payBill('${docSnap.id}', this.value)">
                        <option value="">Select</option>
                        <option value="Cash">Cash</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                </td>
                <td>
                    <button onclick="deleteBill('${docSnap.id}')">Delete</button>
                </td>
            `;
            billingList.appendChild(tr);
        }
    });
}

/**
 * Pay a bill
 * @param {string} billId
 * @param {string} method - Cash or Transfer
 */
window.payBill = async function(billId, method) {
    if(!method) return;
    try {
        const billRef = doc(db, "bills", billId);
        await updateDoc(billRef, {
            status: "Paid",
            paymentMethod: method
        });
        alert(`Bill marked as Paid via ${method}`);
        // Update Finance
        const billSnap = await getDocs(billRef);
        const billData = (await billSnap.get()).data();
        updateFinance(billData.price, billData.itemType); // call finance update
        loadBills(); // refresh
    } catch (error) {
        console.error("Error paying bill: ", error);
    }
}

/**
 * Delete a bill
 * @param {string} billId
 */
window.deleteBill = async function(billId) {
    try {
        const billRef = doc(db, "bills", billId);
        await updateDoc(billRef, {
            status: "Deleted"
        });
        loadBills();
    } catch (error) {
        console.error("Error deleting bill: ", error);
    }
}
