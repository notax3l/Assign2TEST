document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get selected base
    const base = document.querySelector('input[name="base"]:checked')?.value;
    const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(el => el.value);
    const boosters = Array.from(document.querySelectorAll('input[name="boosters"]:checked')).map(el => el.value);
    const sweetness = document.getElementById("sweetness").value;
    const notes = document.getElementById("notes").value;

    // Validation
    if (!base || fruits.length === 0) {
        alert("Please select at least a base and one fruit.");
        return;
    }

    const smoothie = {
        name: `${base} Smoothie`,
        base: base,
        fruits: fruits,
        boosters: boosters,
        sweetness: sweetness,
        notes: notes,
        color: "#FF6B6B", // You can change this color based on user selection or preferences
        price: calculatePrice(base, fruits, boosters) // Pricing logic
    };

    displaySmoothie(smoothie);
});

function calculatePrice(base, fruits, boosters) {
    let price = 5; // base price

    // Add price based on fruits
    price += fruits.length * 1.5;

    // Add price based on boosters
    price += boosters.length * 2;

    return price;
}

function displaySmoothie(smoothie) {
    document.querySelector(".result-section").classList.remove("hidden");

    // Smoothie cup and color
    document.querySelector(".liquid").style.backgroundColor = smoothie.color;
    document.querySelector(".smoothie-details h3").textContent = smoothie.name;

    let description = `${smoothie.name} with ${smoothie.fruits.join(", ")}`;
    if (smoothie.boosters.length) {
        description += ` and Boosters: ${smoothie.boosters.join(", ")}`;
    }
    description += `<br><strong>Sweetness:</strong> ${smoothie.sweetness}/10`;
    if (smoothie.notes) {
        description += `<br><strong>Notes:</strong> ${smoothie.notes}`;
    }

    document.querySelector(".smoothie-description").innerHTML = description;

    const priceElement = document.getElementById("price-details");
    priceElement.innerHTML = `
        <div class="price-row"><span>Smoothie Price:</span><span>$${smoothie.price.toFixed(2)}</span></div>
        <div class="price-row total"><span>Total:</span><span>$${smoothie.price.toFixed(2)}</span></div>
    `;
}
