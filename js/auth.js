import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const loginBtn = document.getElementById("loginBtn");

if(loginBtn){

loginBtn.onclick = ()=>{

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

window.location.href = "dashboard.html";

})
.catch(e=>{
alert("Login Failed: " + e.message);
});

};

}


/* Auto protection */

onAuthStateChanged(auth,(user)=>{

if(!user){

if(window.location.pathname.includes("dashboard")){
window.location.href = "index.html";
}

}

});


/* Logout */

const logoutBtn = document.getElementById("logout");

if(logoutBtn){

logoutBtn.onclick=()=>{

signOut(auth).then(()=>{

window.location.href="index.html";

});

};

}
