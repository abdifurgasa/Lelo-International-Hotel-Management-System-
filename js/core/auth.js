function loadLogin() {
    document.getElementById("app").innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:linear-gradient(135deg,purple,green);color:white;">
            <div style="background:white;color:black;padding:30px;border-radius:10px;width:300px;">
                <h2 style="text-align:center;">Login</h2>
                <input type="text" id="username" placeholder="Username" style="width:100%;margin-bottom:10px;padding:8px;">
                <input type="password" id="password" placeholder="Password" style="width:100%;margin-bottom:10px;padding:8px;">
                <button onclick="login()" style="width:100%;padding:10px;background:purple;color:white;border:none;">Login</button>
            </div>
        </div>
    `;
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        loadDashboard();
    } else {
        alert("Invalid Login");
    }
}
