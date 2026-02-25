function loadDashboard() {
    document.getElementById("app").innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(135deg,green,purple);color:white;padding:20px;">
            <h1>Lelo International Hotel Management System</h1>

            <button onclick="loadRooms()" style="padding:10px;margin-right:10px;">Manage Rooms</button>
            <button onclick="loadLogin()" style="padding:10px;">Logout</button>

            <div id="content" style="margin-top:20px;"></div>
        </div>
    `;
}
