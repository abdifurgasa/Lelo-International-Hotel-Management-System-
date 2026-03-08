import { auth, db } from "./firebase.js";

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import module functions (make sure these exist)
import { loadStaff } from "./staff.js";
import { loadOrders, loadRoleOrders } from "./order.js";
import { loadFoods } from "./restaurant.js";
import { loadDrinks } from "./drinks.js";
import { loadRooms } from "./rooms.js"; // optional if you want live room reload

/* ===============================
Page Loader
=============================== */
window.loadPage = async function(pageId){

  const user = auth.currentUser;

  if(!user){
    window.location="index.html";
    return;
  }

  // Get role
  const userDoc = await getDoc(doc(db,"users",user.email));
  if(!userDoc.exists()){
    alert("Access denied");
    return;
  }
  const role = userDoc.data().role;

  // Role permissions
  if(role !== "manager"){
    if(pageId === "staffPage" && role !== "manager") { alert("Only manager can access"); return; }
    if(pageId === "restaurant" && role !== "kitchen") { alert("Only kitchen can access"); return; }
    if(pageId === "drinks" && role !== "barman") { alert("Only barman can access"); return; }
    if(pageId === "orderPage" && role !== "reception") { alert("Only reception can access"); return; }
  }

  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.style.display="none");

  // Show selected page
  const page = document.getElementById(pageId);
  if(page) page.style.display="block";

  // Auto-load modules
  if(pageId === "staffPage") loadStaff();
  if(pageId === "orderPage") { loadOrders(); loadRoleOrders(); }
  if(pageId === "restaurant") loadFoods();
  if(pageId === "drinks") loadDrinks();
  if(pageId === "rooms") loadRooms(); // optional
};

/* ===============================
Dashboard Statistics (Firebase)
=============================== */
async function loadDashboardStats(){
  try{
    // Rooms
    const roomsSnap = await getDocs(collection(db,"rooms"));
    let totalRooms = roomsSnap.size;
    let occupiedRooms = 0;
    roomsSnap.forEach(doc => {
      if(doc.data().status === "Occupied") occupiedRooms++;
    });

    // Foods
    const foodSnap = await getDocs(collection(db,"foods"));
    let totalFoods = foodSnap.size;

    // Drinks
    const drinkSnap = await getDocs(collection(db,"drinks"));
    let totalDrinks = drinkSnap.size;

    // Update Dashboard UI
    if(document.getElementById("totalRooms")) document.getElementById("totalRooms").innerText = totalRooms;
    if(document.getElementById("occupiedRooms")) document.getElementById("occupiedRooms").innerText = occupiedRooms;
    if(document.getElementById("totalFoods")) document.getElementById("totalFoods").innerText = totalFoods;
    if(document.getElementById("totalDrinks")) document.getElementById("totalDrinks").innerText = totalDrinks;

  }catch(error){
    console.log(error);
  }
}

/* ===============================
Logout System
=============================== */
window.logout = function(){
  if(confirm("Logout?")){
    auth.signOut().then(()=>{
      window.location="index.html";
    });
  }
};

/* ===============================
Auto Run Dashboard Stats
=============================== */
loadDashboardStats();
