// js/i18n.js

const translations = {

    en:{
        dashboard:"Dashboard",
        rooms:"Rooms",
        orders:"Orders",
        billing:"Billing",
        restaurant:"Restaurant",
        drinks:"Drinks",
        staffManagement:"Staff Management",
        finance:"Finance",
        logout:"Logout",
        welcome:"Welcome to Lelo International Hotel System",
        todayOrders:"Today Orders",
        todayRevenue:"Today Revenue",
        totalRooms:"Total Rooms",
        occupiedRooms:"Occupied Rooms",
        addRoom:"Add Room",
        addFood:"Add Food Item",
        addDrink:"Add Drink",
        price:"Price",
        type:"Type",
        status:"Status",
        pay:"Pay",
        selectPayment:"Select Payment Method",
        login:"Login"
    },

    om:{
        dashboard:"Daashibordii",
        rooms:"Kutaa",
        orders:"Ajaja",
        billing:"Bilii",
        restaurant:"Mana nyaataa",
        drinks:"Dhugaatii",
        staffManagement:"Bulchiinsa Hojjettoota",
        finance:"Maallaqa",
        logout:"Bahi",
        welcome:"Baga nagaan dhuftan Lelo International Hotel",
        todayOrders:"Ajajoota Har’aa",
        todayRevenue:"Galii Har’aa",
        totalRooms:"Kutaa Guutuu",
        occupiedRooms:"Kutaa Fudhatee",
        addRoom:"Kutaa Haaraa Dabaluu",
        addFood:"Nyaata Haaraa Dabaluu",
        addDrink:"Dhugaatii Haaraa Dabaluu",
        price:"Gatii",
        type:"Gosa",
        status:"Haala",
        pay:"Baasuu",
        selectPayment:"Mala Kaffaltii Filadhu",
        login:"Seensa"
    },

    am:{
        dashboard:"ዳሽቦርድ",
        rooms:"ክፍሎች",
        orders:"ትዕዛዞች",
        billing:"ቢል",
        restaurant:"ምግብ ቤት",
        drinks:"መጠጦች",
        staffManagement:"ሰራተኞች አስተዳደር",
        finance:"ፋይናንስ",
        logout:"ውጣ",
        welcome:"ለሎ ኢንተርናሽናል ሆቴል እንኳን በደህና መጡ",
        todayOrders:"የዛሬ ትዕዛዞች",
        todayRevenue:"የዛሬ ገቢ",
        totalRooms:"አጠቃላይ ክፍሎች",
        occupiedRooms:"ተይዞ ያለ ክፍሎች",
        addRoom:"አዲስ ክፍል ያክሉ",
        addFood:"አዲስ ምግብ ያክሉ",
        addDrink:"አዲስ መጠጥ ያክሉ",
        price:"ዋጋ",
        type:"አይነት",
        status:"ሁኔታ",
        pay:"ክፍያ",
        selectPayment:"የክፍያ ዘዴ ይምረጡ",
        login:"መግቢያ"
    }

};

// Apply language
export function setLanguage(lang){

    document.querySelectorAll("[data-i18n]").forEach(el=>{

        const key = el.getAttribute("data-i18n");

        if(translations[lang] && translations[lang][key]){
            el.innerText = translations[lang][key];
        }

    });

}

// Detect selector automatically
document.addEventListener("DOMContentLoaded",()=>{

    const selector =
        document.getElementById("langSelect") ||
        document.getElementById("languageSelect");

    if(selector){

        selector.addEventListener("change",(e)=>{
            setLanguage(e.target.value);
        });

    }

});
