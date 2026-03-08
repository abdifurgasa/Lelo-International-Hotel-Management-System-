let foods = JSON.parse(localStorage.getItem("foods")) || [];

window.addFood = function() {
    let name = document.getElementById("foodName").value;
    let price = document.getElementById("foodPrice").value;
    let photoInput = document.getElementById("foodPhoto");
    let photo = photoInput.files[0];

    if (!photo) {
        alert("Please select a photo for the food item.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        foods.push({
            name: name,
            price: price,
            photo: reader.result
        });
        localStorage.setItem("foods", JSON.stringify(foods));
        loadFoods();
    }
    reader.readAsDataURL(photo);
}

window.loadFoods = function() {
    let list = document.getElementById("foodMenuList");
    list.innerHTML = "";
    foods.forEach(food => {
        list.innerHTML += `
        <div class="menuItem">
            <img src="${food.photo}" width="80" style="border-radius:8px;">
            <p>${food.name} - ${food.price} birr</p>
        </div>
        `;
    });
}

loadFoods();
