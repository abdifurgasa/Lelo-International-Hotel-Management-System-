import { db } from "./firebase.js";

import {
setDoc,
doc,
getDocs,
collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


window.addStaff = async function(){

let email = document.getElementById("staffEmail").value;
let role = document.getElementById("staffRole").value;

if(!email || !role){
alert("Fill all fields");
return;
}

await setDoc(doc(db,"users",email),{
email:email,
role:role,
createdAt:new Date()
});

alert("Staff added");

loadStaff();

}


/* Staff List Loader */

window.loadStaff = async function(){

let list = document.getElementById("staffList");

if(!list) return;

list.innerHTML="";

const snapshot = await getDocs(collection(db,"users"));

snapshot.forEach(docSnap=>{

let data = docSnap.data();

list.innerHTML += `
<p>
${data.email} - ${data.role}
</p>
`;

});

}
