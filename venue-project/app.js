const venueMap = document.getElementById("venue-map");


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
        L1: { left: "450px", top: "70px" },
        L2: { left: "240px", top: "240px" },

        R1: { left: "470px", top: "300px" },
        R2: { left: "610px", top: "300px" },
        R3: { left: "750px", top: "300px" },

        R4: { left: "470px", top: "420px" },
        R5: { left: "610px", top: "420px" },
        R6: { left: "750px", top: "420px" },

        R7: { left: "470px", top: "540px" },
        R8: { left: "610px", top: "540px" },
        R9: { left: "750px", top: "540px" },

        S1: { left: "750px", top: "710px" },
        S2: { left: "950px", top: "650px" },
        S3: { left: "850px", top: "680px" }
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
        chair.textContent = i + 1;
        chair.setAttribute("aria-label", `Table ${table.id}, seat ${i + 1}`);

        if (table.type === "long") {
            chair.classList.add(
                `seat-${getSeatPosition(i, table.orientation)}`
            );
        } else {
            chair.classList.add(`seat-${i + 1}`);
        }

        chair.addEventListener("click", function () {
            if (table.type === "long") {
                alert(
                    `Table ${table.id}\nSeat: ${i + 1}\nIndividual seat selection`
                );
            } else {
                alert(
                    `Table ${table.id}\nCapacity: ${table.seats} people\nWhole table selection`
                );
            }
        });

        tableElement.appendChild(chair);
    }

    cafeteria.appendChild(tableElement);
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

