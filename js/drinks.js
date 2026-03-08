let drinks = JSON.parse(localStorage.getItem("drinks")) || [];

window.addDrink = function() {
    let name = document.getElementById("drinkName").value;
    let price = document.getElementById("drinkPrice").value;
    let photoInput = document.getElementById("drinkPhoto");
    let photo = photoInput.files[0];

    if (!photo) {
        alert("Please select a photo for the drink.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        drinks.push({
            name: name,
            price: price,
            photo: reader.result
        });
        localStorage.setItem("drinks", JSON.stringify(drinks));
        loadDrinks();
    }
    reader.readAsDataURL(photo);
}

window.loadDrinks = function() {
    let list = document.getElementById("drinkMenuList");
    list.innerHTML = "";
    drinks.forEach(drink => {
        list.innerHTML += `
        <div class="menuItem">
            <img src="${drink.photo}" width="80" style="border-radius:8px;">
            <p>${drink.name} - ${drink.price} birr</p>
        </div>
        `;
    });
}

loadDrinks();
