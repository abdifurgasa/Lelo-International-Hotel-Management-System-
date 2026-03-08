window.loadFinanceChart = function(){

let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
let foods = JSON.parse(localStorage.getItem("foods")) || [];
let drinks = JSON.parse(localStorage.getItem("drinks")) || [];

let roomIncome = rooms.reduce((a,b)=>a+Number(b.price||0),0);
let foodIncome = foods.reduce((a,b)=>a+Number(b.price||0),0);
let drinkIncome = drinks.reduce((a,b)=>a+Number(b.price||0),0);

const ctx = document.getElementById("revenueChart");

if(!ctx) return;

new Chart(ctx, {
type:"pie",

data:{
labels:["Rooms","Food","Drinks"],

datasets:[{
data:[roomIncome,foodIncome,drinkIncome],

backgroundColor:[
"#2c7be5",
"#28a745",
"#ffc107"
]

}]
},

options:{
responsive:true
}

});

};

loadFinanceChart();
