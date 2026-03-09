import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


window.loadFinance = async function(){

let roomRevenue = 0;
let foodRevenue = 0;
let drinkRevenue = 0;

try{

/* ROOM PAYMENTS */

const roomSnap = await getDocs(collection(db,"roomPayments"));

roomSnap.forEach(doc=>{
roomRevenue += Number(doc.data().amount);
});


/* FOOD ORDERS */

const foodSnap = await getDocs(collection(db,"foodOrders"));

foodSnap.forEach(doc=>{
foodRevenue += Number(doc.data().price);
});


/* DRINK ORDERS */

const drinkSnap = await getDocs(collection(db,"drinkOrders"));

drinkSnap.forEach(doc=>{
drinkRevenue += Number(doc.data().price);
});


let totalRevenue = roomRevenue + foodRevenue + drinkRevenue;


/* UPDATE CARDS */

document.getElementById("totalRevenue").innerText = totalRevenue;
document.getElementById("roomRevenue").innerText = roomRevenue;
document.getElementById("foodRevenue").innerText = foodRevenue;
document.getElementById("drinkRevenue").innerText = drinkRevenue;


/* CREATE CHART */

const ctx = document.getElementById("revenueChart");

new Chart(ctx,{
type:"bar",
data:{
labels:["Rooms","Food","Drinks"],
datasets:[{
label:"Revenue",
data:[roomRevenue,foodRevenue,drinkRevenue]
}]
}
});

}catch(error){

console.log("Finance error:",error);

}

}
