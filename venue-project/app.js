const venueMap = document.getElementById("venue-map");

///           cart
const selectedSeats = new Map();
const cart = new Map();

// seat prices
const SEAT_PRICES = {
long: 5.00,
sofa: 10.00,
round: 8.00,
small: 6.50
};

function getSeatPrice(seatId) {
if (seatId.startsWith("L")) return SEAT_PRICES.long;
if (seatId.startsWith("D")) return SEAT_PRICES.sofa;
if (seatId.startsWith("R")) return SEAT_PRICES.round;
if (seatId.startsWith("S")) return SEAT_PRICES.small;

return 0;

}


const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addToCartButton = document.getElementById("add-to-cart");
const detailsContent = document.getElementById("details-content");

let currentSelection = null;


//adding info

function updateSelectionDetails() {
    detailsContent.replaceChildren();

    if (selectedSeats.size === 0) {
        detailsContent.textContent = "No seats selected.";
        addToCartButton.disabled = true;
        return;
    }

    let total = 0;

    selectedSeats.forEach(function (item) {
        const price = item.price ?? getSeatPrice(item.id);
        total += price;

        const row = document.createElement("p");
        row.textContent =
            `${item.description} — ${price.toFixed(2)} AZN`;

        detailsContent.appendChild(row);
    });

    const totalElement = document.createElement("p");
    totalElement.textContent =
        `Selected total: ${total.toFixed(2)} AZN`;

    detailsContent.appendChild(totalElement);

    addToCartButton.disabled = false;
}



// Select or deselect a seat
function toggleSeatSelection(seatId, seatElement, description) {

    if (cart.has(seatId)) {
        alert("This seat cannot be chosen at the moment. Please, choose another seat.");
        return;
  }

    if (selectedSeats.has(seatId)) {
        selectedSeats.delete(seatId);
        seatElement.classList.remove("selected");
    } else {
        selectedSeats.set(seatId, {
            id: seatId,
            description: description,
            element: seatElement
        });

        seatElement.classList.add("selected");
    }

    currentSelection = selectedSeats.size > 0;

updateSelectionDetails();
}

// Add selected seats to cart
function addSelectedSeatsToCart() {
selectedSeats.forEach(function (item) {
if (!cart.has(item.id)) {
cart.set(item.id, {
id: item.id,
description: item.description,
price: item.price ?? getSeatPrice(item.id),
isTable: item.isTable ?? false
});


        item.element.classList.remove("selected");
        item.element.classList.add("in-cart");
    }
});

selectedSeats.clear();

updateSelectionDetails();

saveCart();
renderCart();


}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem(
        "cafeteriaCart",
        JSON.stringify(Array.from(cart.values()))
    );
}


// Display cart items and total price
function renderCart() {
    cartItems.replaceChildren();

    let total = 0;

    cart.forEach(function (item) {
        total += item.price;

        const row = document.createElement("div");
        row.classList.add("cart-item");

        const description = document.createElement("span");
        description.textContent = `${item.description} — ${item.price.toFixed(2)} AZN`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            cart.delete(item.id);
            saveCart();

            const seatElement = document.querySelector(
                `[data-seat-id="${item.id}"]`
            );

            if (seatElement) {
    seatElement.classList.remove("in-cart", "selected");
}

if (item.isTable) {
    const tableElement = document.querySelector(
        `[data-table-id="${item.id}"]`
    );

    if (tableElement) {
        tableElement.classList.remove("in-cart", "selected");
    }
}

            renderCart();
        });

        row.append(description, removeButton);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = `${total.toFixed(2)} AZN`;
}

// Add-to-cart button
addToCartButton.addEventListener("click", addSelectedSeatsToCart);


const cafeteria = document.createElement("div");
cafeteria.classList.add("cafeteria-floor");

venueMap.appendChild(cafeteria);


const tables = [
    {
        id: "L1",
        type: "long",
        orientation: "horizontal",
        seats: 24
    },
    {
        id: "L2",
        type: "long",
        orientation: "vertical",
        seats: 24
    },

    {
        id: "M1",
        type: "mid",
        orientation: "vertical",
        seats: 12
    },
    {
        id: "M2",
        type: "mid",
        orientation: "vertical",
        seats: 12
    },

    {
        id: "M3",
        type: "mid",
        orientation: "vertical",
        seats: 12
    },
    {
        id: "M4",
        type: "mid",
        orientation: "vertical",
        seats: 12
    },

    {
        id: "M5",
        type: "mid",
        orientation: "vertical",
        seats: 12
    },
    {
        id: "M6",
        type: "mid",
        orientation: "vertical",
        seats: 12
    }
];

// masalari elave etdim
for (let i = 1; i <= 9; i++) {
    tables.push({
        id: `R${i}`,
        type: "round",
        seats: 4
    });
}


for (let i = 1; i <= 3; i++) {
    tables.push({
        id: `S${i}`,
        type: "small",
        seats: 2
    });
}





tables.forEach(function (table) {
    const tableElement = document.createElement("div");

    tableElement.classList.add("table", table.type);
    tableElement.classList.add(`table-${table.id}`);

    tableElement.dataset.tableId = table.id;

    
    const positions = {
        L1: { left: "600px", top: "70px" },
        L2: { left: "390px", top: "240px" },

        M1: { left: "100px", top: "25px" },
        M2: { left: "100px", top: "315px" },

        M3: { left: "1350px", top: "25px" },
        M4: { left: "1350px", top: "195px" },

        M5: { left: "1350px", top: "487px" },
        M6: { left: "1350px", top: "655px" },

        R1: { left: "620px", top: "300px" },
        R2: { left: "760px", top: "300px" },
        R3: { left: "900px", top: "300px" },

        R4: { left: "620px", top: "420px" },
        R5: { left: "760px", top: "420px" },
        R6: { left: "900px", top: "420px" },

        R7: { left: "620px", top: "540px" },
        R8: { left: "760px", top: "540px" },
        R9: { left: "900px", top: "540px" },

        S1: { left: "800px", top: "910px" },
        S2: { left: "900px", top: "880px" },
        S3: { left: "1000px", top: "850px" }
    };

    const position = positions[table.id];

    if (position) {
        tableElement.style.left = position.left;
        tableElement.style.top = position.top;
    }

    if (table.orientation === "vertical") {
        tableElement.classList.add("vertical");
    }


    const tabletop = document.createElement("div");
    tabletop.classList.add("tabletop");

    tabletop.textContent = table.id;

    tableElement.appendChild(tabletop);

    for (let i = 0; i < table.seats; i++) {
        const chair = document.createElement("button");

        chair.classList.add("chair");
        chair.dataset.seatId = `${table.id}-S${i + 1}`;
        chair.textContent = i + 1;
        chair.setAttribute("aria-label", `Table ${table.id}, seat ${i + 1}`);

        if (table.type === "long"  || table.type === "mid") {
            if (table.type === "long") {
        const side = getSeatPosition(i, table.orientation);

        chair.classList.add(`seat-${side}`);

        if (table.orientation === "horizontal") {
        if (side === "top" || side === "bottom") {
        const seatIndex = side === "top" ? i : i - 10;
        chair.style.left = `${72.5 + seatIndex * 30}px`;
        } else {
        const seatIndex = side === "left" ? i - 20 : i - 22;
        chair.style.top = `${82.5 + seatIndex * 30}px`;
        }
    } else {
        if (side === "left" || side === "right") {
        const seatIndex = side === "left" ? i : i - 10;
        chair.style.top = `${72.5 + seatIndex * 30}px`;
        } else {
        const seatIndex = side === "top" ? i - 20 : i - 22;
        chair.style.left = `${82.5 + seatIndex * 30}px`;
        }
    }


} else if (table.type === "mid") {
chair.classList.add(`seat-${getSeatPosition(i, table.orientation)}`);
} else {
chair.classList.add(`seat-${i + 1}`);
}

        } else {
            chair.classList.add(`seat-${i + 1}`);
        }

        chair.addEventListener("click", function () {
if (table.type === "long") {
const seatId = `${table.id}-S${i + 1}`;


    toggleSeatSelection(
        seatId,
        chair,
        `Table ${table.id}, Seat ${i + 1}`
    );


} else if (table.type === "round" || table.type === "small") {
    const tableId = table.id;

    // If the table is already in the cart, do nothing
    if (cart.has(tableId)) {
        alert("This seat cannot be chosen at the moment. Please, choose another seat.");
        return;
    }

    // If already selected, cancel the selection
    if (selectedSeats.has(tableId)) {
        selectedSeats.delete(tableId);
        tableElement.classList.remove("selected");
    } else {
        // Select the whole table.
        selectedSeats.set(tableId, {
            id: tableId,
            description: `Table ${tableId} (whole table)`,
            element: tableElement,
            price: SEAT_PRICES[table.type],
            isTable: true
        });

        tableElement.classList.add("selected");
    }

    updateSelectionDetails();

}else {
    alert(
        `Table ${table.id}\n` +
        `Capacity: ${table.seats} people\n` +
        `Whole table selection`
    );
}


});



        tableElement.appendChild(chair);
    }

    cafeteria.appendChild(tableElement);
});

// Divanlar
const sofas = [
// SOL TEREF yuxaridaki divanlar
{ id: "D1", left: 70, top: 0, rotation: 0 },
{ id: "D2", left: -53, top: 110, rotation: 270 },
{ id: "D3", left: 70, top: 220, rotation: 180 },

// SOL TEREF asagidaki divanlar
{ id: "D5", left: 70, top: 290, rotation: 0 },
{ id: "D6", left: -53, top: 400, rotation: 270 },
{ id: "D7", left: 70, top: 510, rotation: 180 },

// SAG TEREF yuxaridaki divanlar
{ id: "D9", left: 1320, top: 0, rotation: 0 },
{ id: "D10", left: 1450, top: 110, rotation: 90 },
{ id: "D11", left: 1450, top: 280, rotation: 90 },
{ id: "D12", left: 1320, top: 390, rotation: 180 },

// SAG TEREF asagidaki divanlar
{ id: "D13", left: 1320, top: 460, rotation: 0 },
{ id: "D14", left: 1450, top: 570, rotation: 90 },
{ id: "D15", left: 1450, top: 740, rotation: 90 },
{ id: "D16", left: 1320, top: 850, rotation: 180 }


];


sofas.forEach(function (sofa) {
const sofaElement = document.createElement("div");


sofaElement.classList.add("sofa");
sofaElement.dataset.sofaId = sofa.id;

sofaElement.style.left = `${sofa.left}px`;
sofaElement.style.top = `${sofa.top}px`;
sofaElement.style.transform = `rotate(${sofa.rotation}deg)`;

const sofaBack = document.createElement("div");
sofaBack.classList.add("sofa-back");

const sofaSeat = document.createElement("div");
sofaSeat.classList.add("sofa-cushion");

sofaElement.appendChild(sofaBack);
sofaElement.appendChild(sofaSeat);

//4 seats for each divan

for(let i=1; i<=4; i++){
    const seat= document.createElement("button");
    seat.classList.add("sofa-seat");
    seat.dataset.seatId = `${sofa.id}-S${i}`;
    seat.textContent = i;
    seat.dataset.sofaId = sofa.id;
    seat.dataset.seatNumber = i;

    seat.setAttribute("aria-label", `Sofa ${sofa.id}, seat ${i}`);

    seat.addEventListener("click", function () {
    const seatId = `${sofa.id}-S${i}`;

    toggleSeatSelection(
        seatId,
        seat,
        `Sofa ${sofa.id}, Seat ${i}`
    );
});

    sofaElement.appendChild(seat);
}

cafeteria.appendChild(sofaElement);

});





function getSeatPosition(index, orientation) {
    if (orientation === "horizontal") {
        if (index < 10) return "top";
        if (index < 20) return "bottom";
        if (index === 20 || index === 21) return "left";
        return "right";
    }

    if (index < 10) return "left";
    if (index < 20) return "right";
    if (index === 20 || index === 21) return "top";
    return "bottom";
}



// Map navigation controls zoom in out zad
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const moveUpButton = document.getElementById("move-up");
const moveDownButton = document.getElementById("move-down");
const moveLeftButton = document.getElementById("move-left");
const moveRightButton = document.getElementById("move-right");
const resetViewButton = document.getElementById("reset-view");

let mapZoom = 1;

const zoomStep = 0.1;
const moveStep = 100;
const minZoom = 0.5;
const maxZoom = 1.5;

// Apply zoom to the cafeteria floor
function updateZoom() {
    cafeteria.style.transform = `scale(${mapZoom})`;
    cafeteria.style.transformOrigin = "top left";
    cafeteria.style.margin = "0";
}

// Zoom in
zoomInButton.addEventListener("click", function () {
    if (mapZoom < maxZoom) {
        mapZoom = Math.min(maxZoom, mapZoom + zoomStep);
        updateZoom();
    }
});

// Zoom out
zoomOutButton.addEventListener("click", function () {
    if (mapZoom > minZoom) {
        mapZoom = Math.max(minZoom, mapZoom - zoomStep);
        updateZoom();
    }
});

// Move map up
moveUpButton.addEventListener("click", function () {
    venueMap.scrollTop -= moveStep;
});

// Move map down
moveDownButton.addEventListener("click", function () {
    venueMap.scrollTop += moveStep;
});

// Move map left
moveLeftButton.addEventListener("click", function () {
    venueMap.scrollLeft -= moveStep;
});

// Move map right
moveRightButton.addEventListener("click", function () {
    venueMap.scrollLeft += moveStep;
});

// Reset map view
resetViewButton.addEventListener("click", function () {
    mapZoom = 1;
    updateZoom();

    venueMap.scrollTop = 0;
    venueMap.scrollLeft = 0;
});


// Restore cart from localStorage
function restoreCart() {
    const savedCart = localStorage.getItem("cafeteriaCart");

    if (!savedCart) {
        return;
    }

    try {
        const savedItems = JSON.parse(savedCart);

        savedItems.forEach(function (item) {
            cart.set(item.id, item);

            if (item.isTable) {
                const tableElement = document.querySelector(
                    `[data-table-id="${item.id}"]`
                );

                if (tableElement) {
                    tableElement.classList.add("in-cart");
                }
            } else {
                const seatElement = document.querySelector(
                    `[data-seat-id="${item.id}"]`
                );

                if (seatElement) {
                    seatElement.classList.add("in-cart");
                }
            }
        });

        renderCart();
    } catch (error) {
        console.error("Could not restore cart:", error);
    }
}

// Restore saved data after the venue has been generated
restoreCart();

