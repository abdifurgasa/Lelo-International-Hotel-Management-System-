function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="min-height:100vh;
        background:linear-gradient(135deg,#0f9b0f,#6a0dad);
        padding:40px;
        color:white;
        font-family:Arial;">

            <div style="
                max-width:900px;
                margin:auto;
                background:rgba(255,255,255,0.1);
                backdrop-filter:blur(10px);
                border-radius:25px;
                padding:40px;
                box-shadow:0 0 25px rgba(0,0,0,0.3);
                text-align:center;
            ">

                <h1>🏨 Hotel Management System</h1>

                <div style="display:grid;gap:15px;margin-top:30px;">

                    <button onclick="loadRooms()" style="padding:15px;border:none;border-radius:15px;font-size:16px;cursor:pointer;">
                        Manage Rooms
                    </button>

                    <button onclick="loadFinance()" style="padding:15px;border:none;border-radius:15px;font-size:16px;cursor:pointer;">
                        Finance System
                    </button>

                    <button onclick="loadLogin()" style="padding:15px;border:none;border-radius:15px;font-size:16px;cursor:pointer;">
                        Logout
                    </button>

                </div>

                <div id="content" style="
                    margin-top:40px;
                    background:white;
                    color:black;
                    padding:25px;
                    border-radius:20px;
                    text-align:left;
                    min-height:250px;
                ">
                </div>

            </div>
        </div>
    `;
}

/* ===============================
   FINANCE SYSTEM
================================*/

function getFinance() {
    return JSON.parse(localStorage.getItem("finance")) || [];
}

function saveFinance(data) {
    localStorage.setItem("finance", JSON.stringify(data));
}

function loadFinance() {
    document.getElementById("content").innerHTML = `
        <h2>Finance Billing</h2>

        <input id="billName" placeholder="Bill Name"/>
        <input id="billAmount" placeholder="Amount"/>

        <button onclick="addFinance()">Add Payment</button>

        <hr/>

        <div id="financeList"></div>
    `;

    displayFinance();
}

function addFinance() {
    const name = document.getElementById("billName").value;
    const amount = document.getElementById("billAmount").value;

    if (!name || !amount) {
        alert("Fill finance fields");
        return;
    }

    const finance = getFinance();

    finance.push({
        name,
        amount,
        date: new Date().toLocaleString()
    });

    saveFinance(finance);
    displayFinance();
}

function displayFinance() {
    const list = document.getElementById("financeList");
    if (!list) return;

    const finance = getFinance();

    if (!finance.length) {
        list.innerHTML = "No finance records";
        return;
    }

    list.innerHTML = finance.map(item => `
        <div style="background:#f5f5f5;
        padding:10px;
        margin:8px 0;
        border-radius:10px;">

            ${item.name} |
            $${item.amount} |
            ${item.date}

        </div>
    `).join("");
}
