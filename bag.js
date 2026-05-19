// SAMPLE INVENTORY DATA
const inventoryItems = [
    { name: "Sword", icon: "⚔️", count: 1 },
    { name: "Potion", icon: "🧪", count: 5 },
    { name: "Shield", icon: "🛡️", count: 1 },
    { name: "Gold", icon: "💰", count: 250 },
    { name: "Bow", icon: "🏹", count: 1 },
    { name: "Apple", icon: "🍎", count: 12 },
    { name: "Gem", icon: "💎", count: 3 },
    { name: "Map", icon: "🗺️", count: 1 }
];

// ELEMENTS
const modal = document.getElementById("inventoryModal");
const openBtn = document.getElementById("openInventory");
const closeBtn = document.getElementById("closeInventory");
const inventoryGrid = document.getElementById("inventoryGrid");
const pond = document.querySelectorAll(".pond")
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
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-count">${item.count}</div>
        `;

        inventoryGrid.appendChild(slot);
    });
}

renderInventory();

// Reveal pond Div
pondBtn.addEventListener("click", () => {
    pond.classList.toggle("pond");
});