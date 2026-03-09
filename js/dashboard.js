// PAGE SWITCH SYSTEM

function loadPage(pageId){

const pages = document.querySelectorAll(".page")

pages.forEach(page=>{
page.style.display="none"
})

document.getElementById(pageId).style.display="block"

}


// DASHBOARD MENU TOGGLE

const dashboardToggle = document.getElementById("dashboardToggle")
const dashboardMenu = document.getElementById("dashboardMenu")

dashboardToggle.addEventListener("click", function(){

if(dashboardMenu.style.display==="block"){

dashboardMenu.style.display="none"

}else{

dashboardMenu.style.display="block"

}

})


// STAFF PASSWORD TOGGLE

const toggleStaffPassword=document.getElementById("toggleStaffPassword")

const staffPassword=document.getElementById("staffPassword")

toggleStaffPassword.addEventListener("click",function(){

const type=staffPassword.getAttribute("type")==="password"?"text":"password"

staffPassword.setAttribute("type",type)

this.textContent=type==="password"?"👁️":"🙈"

})


// TODAY DATE

document.getElementById("todayDate").innerText=
new Date().toDateString()


// LOGOUT

function logout(){

localStorage.removeItem("leloUser")

window.location.href="login.html"

}
