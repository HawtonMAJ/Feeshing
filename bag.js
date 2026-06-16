// INVENTORY DATA
const inventoryItems = [
    { name: "Fish", icon: "./Fish_1.png", rarity: "⚪", weight: 100 },
    { name: "Fisher", icon: "./Fish_2.png", rarity: "🟢", weight: 25 }
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
// Add fish to inventory when pond is clicked
pond.addEventListener("click", addItem);
// Weighted random function for determing what fish is caught.
function weighted_random(list){
    const totalWeight = list.reduce((sum, item) => sum + item.weight, 0);
    const random = Math.random() * totalWeight;
    let cumulative = 0;
    for (const item of list){
        cumulative+=item.weight;
        if (random<cumulative){
            return item
        }
    }
}
function addItem() {
    // pulls the random number generated above and makes that the item that is added to the inventory.
    const item =weighted_random(inventoryItems);
    // Puts all the appropriate pieces of the fish into the inventory slots
    const slot = document.createElement("div");
    slot.classList.add("item-slot");
    slot.innerHTML = `
    <div class="item-icon"><img src="${item.icon}"></div>
    <div class="item-name">${item.name}</div>
    <div class="item-rarity">${item.rarity}</div>
    `;
    inventoryGrid.appendChild(slot);
    // puts all appropriate fish pieces into toast slot
    const toast = document.getElementById("toast");
    toast.innerHTML = `
    <div class="item-icon"><img src="${item.icon}"></div>
    <div class="item-name">${item.name}</div>
    <div class="item-rarity">${item.rarity}</div>
    `;
    resetHideTimer();
}
// Let the player know what fish they just caught
const toast = document.getElementById("toast");
let hideTimer;
function resetHideTimer(){
    clearTimeout(hideTimer);
    toast.classList.remove("fade-out");
    const currentContent = toast.innerHTML;
    
    hidetimer = setTimeout(() => {
        if (toast.innerHTML === currentContent) {
            toast.classList.add("fade-out");
        }
    }, 1000);
}
document.addEventListener("DOMContentLoaded", toast.classList.add("fade-out"));
// Remove Fish from inventory and give money equal to rarity 5 for white 20 for green
inventoryGrid.addEventListener("click", (event) => {
    const itemSlot = event.target.closest(".item-slot")
    
    if (itemSlot) {
        itemSlot.remove();
    }
});
// Reveal pond Div
pondBtn.addEventListener("click", () => {
    pond.classList.toggle("hide");
});