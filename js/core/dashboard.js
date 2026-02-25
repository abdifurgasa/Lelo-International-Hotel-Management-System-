function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="height:100vh;background:linear-gradient(135deg,green,purple);color:white;padding:20px;">
            <h1>Welcome to Lelo International Hotel Dashboard</h1>
            <button onclick="loadLogin()" style="padding:10px;background:white;color:black;border:none;">Logout</button>
        </div>
    `;
}
