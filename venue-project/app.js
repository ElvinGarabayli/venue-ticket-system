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
        chair.textContent = i + 1;
        chair.setAttribute("aria-label", `Table ${table.id}, seat ${i + 1}`);

        if (table.type === "long"  || table.type === "mid") {
            chair.classList.add(
                `seat-${getSeatPosition(i, table.orientation,table.seats)}`
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

