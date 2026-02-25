function loadDashboard(){
    const app = document.getElementById("app");

    if(!app){
        console.error("App container not found");
        return;
    }

    app.innerHTML = `
    <div style="
        min-height:100vh;
        background: linear-gradient(135deg,#6a11cb,#2575fc,#2ecc71);
        padding:20px;
        font-family: Arial, sans-serif;
        color:white;
    ">

        <h2 style="text-align:center;margin-bottom:30px;">
            🏨 Hotel Management Dashboard
        </h2>

        <div style="
            display:grid;
            grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
            gap:20px;
        ">

            <div style="
                background:rgba(255,255,255,0.15);
                padding:25px;
                border-radius:20px;
                backdrop-filter: blur(10px);
                text-align:center;
                font-size:18px;
            ">
                🛏️ Room Management
            </div>

            <div style="
                background:rgba(255,255,255,0.15);
                padding:25px;
                border-radius:20px;
                backdrop-filter: blur(10px);
                text-align:center;
                font-size:18px;
            ">
                💰 Finance System
            </div>

            <div style="
                background:rgba(255,255,255,0.15);
                padding:25px;
                border-radius:20px;
                backdrop-filter: blur(10px);
                text-align:center;
                font-size:18px;
            ">
                🍽️ Restaurant Order
            </div>

            <div style="
                background:rgba(255,255,255,0.15);
                padding:25px;
                border-radius:20px;
                backdrop-filter: blur(10px);
                text-align:center;
                font-size:18px;
            ">
                👤 User Management
            </div>

        </div>
    </div>
    `;
}
