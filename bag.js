const fish = document.createElement('img');
fish.src = ('./Fish_1.png');
fish.style.width = '32px';

// SAMPLE INVENTORY DATA
const inventoryItems = [
    { name: "Fish", icon: fish, count: 1 }
];

// ELEMENTS
const modal = document.getElementById("inventoryModal");
const openBtn = document.getElementById("openInventory");
const closeBtn = document.getElementById("closeInventory");
const inventoryGrid = document.getElementById("inventoryGrid");
const pond = document.querySelector("#pond")
const pondBtn = document.getElementById("pondButton")

// OPEN MODAL
openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    console.log('button clicked');
});

// CLOSE MODAL
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

// CLOSE WHEN CLICKING OUTSIDE
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// ESC KEY CLOSE
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("active");
    }
});

// RENDER INVENTORY
function renderInventory() {
    inventoryGrid.innerHTML = "";

    inventoryItems.forEach(item => {

        const slot = document.createElement("div");
        slot.classList.add("item-slot");

        slot.innerHTML = `
            <div class="item-icon"><img src="${item.icon.src}"></div>
            <div class="item-name">${item.name}</div>
            <div class="item-count">${item.count}</div>
        `;

        inventoryGrid.appendChild(slot);
    });
}

renderInventory();

// Reveal pond Div
pondBtn.addEventListener("click", () => {
    pond.classList.toggle("hide");
});

// Add fish to inventory when pond is clicked
pond.addEventListener("click", () => {
    
})