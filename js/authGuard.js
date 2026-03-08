import { auth, db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


export async function checkPermission(page){

const user = auth.currentUser;

if(!user){
window.location="index.html";
return false;
}

const userDoc = await getDoc(
doc(db,"users",user.email)
);

if(!userDoc.exists()){
alert("Access denied");
return false;
}

const role = userDoc.data().role;

/* Manager Full Access */

if(role === "manager") return true;

/* Role Page Mapping */

if(page === "food") return role === "kitchen";

if(page === "drinks") return role === "barman";

if(page === "booking") return role === "reception";

if(page === "staffPage") return role === "manager";

return false;
}
