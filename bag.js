// INVENTORY DATA
const inventoryItems = [
    { name: "Fish", icon: "./Fish_2.png", rarityColor: "Gray", rarity: "Common", weight: 1000 },
    { name: "Fishy", icon: "./Fish_3.png", rarityColor: "Green", rarity:"Uncommon", weight: 250 },
    { name: "Fishier", icon: "./Fish_4.png", rarityColor: "Blue", rarity:"Rare", weight: 50 },
    { name: "Fishiest", icon: "./Fish_1.png", rarityColor: "Purple", rarity:"Epic", weight: 10 }
];
// ELEMENTS
const modal = document.getElementById("inventoryModal");
const openBtn = document.getElementById("openInventory");
const closeBtn = document.getElementById("closeInventory");
const inventoryGrid = document.getElementById("inventoryGrid");
const pond = document.querySelector("#pond")
const fishingSpot = document.querySelector("#fishing-spot")
const pondBtn = document.getElementById("pondButton")
// OPEN MODAL
openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    pond.classList.add("hide");
});
// CLOSE MODAL
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    pond.classList.remove("hide");
});
// CLOSE WHEN CLICKING OUTSIDE
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        pond.classList.remove("hide");
        modal.classList.remove("active");
    }
});
// ESC KEY CLOSE
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        pond.classList.remove("hide");
        modal.classList.remove("active");
    }
});

// RENDER INVENTORY
// Add fish to inventory when pond is clicked
fishingSpot.addEventListener("click", addItem);
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

// Fishing spot code and moved generation of fish here
let x = pond.clientWidth - (pond.clientWidth / 2);
let y = pond.clientHeight - (pond.clientHeight / 2);
let item = weighted_random(inventoryItems)
fishingSpot.addEventListener("click", ()=>{
    item = weighted_random(inventoryItems)
    let speed = 1;
    let size = 1;
    if (item.rarity === "Common"){
        speed = 2
        size = 75
    }else if (item.rarity === "Uncommon"){
        speed = 4
        size = 60
    }else if (item.rarity === "Rare"){
        speed = 8
        size = 45
    }else if (item.rarity === "Epic"){
        speed = 16
        size = 30
    };

    fishingSpot.style.width = size + "px";
    fishingSpot.style.height = size + "px";
    const angle = Math.random() * Math.PI * 2;

    xvelocity = Math.cos(angle) * speed;
    yvelocity = Math.sin(angle) * speed;
});
let xvelocity = 1;
let yvelocity = 1;
function fishingSpotMovement() {
    const pondWidth = pond.clientWidth;
    const pondHeight = pond.clientHeight;
    const fishingSpotWidth = fishingSpot.clientWidth;
    const fishingSpotHeight = fishingSpot.clientHeight;
    x += xvelocity;
    y += yvelocity;
    if (x <= 0){
        xvelocity *= -1;
        x = 0;
    };
    if(x >= pondWidth -  fishingSpotWidth){
        xvelocity *= -1;
        x = pondWidth - fishingSpotWidth;
    };
    if(y <= 0){
        yvelocity *= -1;
        y = 0;
    };
    if(y >= pondHeight - fishingSpotHeight){
        yvelocity *= -1;
        y = pondHeight - fishingSpotHeight;
    };
    fishingSpot.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(fishingSpotMovement);
}
fishingSpotMovement();
function addItem() {
    // pulls the random number generated above and makes that the item that is added to the inventory.
    // const item = weighted_random(inventoryItems);
    // Puts all the appropriate pieces of the fish into the inventory slots
    const slot = document.createElement("div");
    slot.classList.add("item-slot");
    slot.innerHTML = `
    <div class="item-icon"><img src="${item.icon}"></div>
    <div class="item-name">${item.name}</div>
    <div class="item-rarity">${item.rarity}</div>
    <div class="item-rarity-color">${item.rarityColor}</div>
    `;
    slot.classList.add(item.rarity)
    inventoryGrid.appendChild(slot);
    // puts all appropriate fish pieces into toast slot
    const toast = document.getElementById("toast");
    toast.innerHTML = `
    <div class="item-icon"><img src="${item.icon}"></div>
    <div class="item-name">${item.name}</div>
    <div class="item-rarity">${item.rarity}</div>
    <div class="item-rarity-color">${item.rarityColor}</div>
    `;
    toast.style.background = item.rarityColor
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
// Remove Fish from inventory and give money equal to rarity 5 for white 30 for green
inventoryGrid.addEventListener("click", (event) => {
    const itemSlot = event.target.closest(".item-slot")
    const itemRarityColor = itemSlot.querySelector(".item-rarity-color")
    const moneyHave = document.querySelector(".money-have")

    if (itemSlot) {
        itemSlot.remove();
    }
    if (itemRarityColor.textContent === "Gray"){
        let currentValue = parseInt(moneyHave.textContent.replace("$", ""))
        let value = currentValue + 5;
        document.querySelector(".money-have").textContent = "$" + value;
    } else if (itemRarityColor.textContent === "Green"){
        let currentValue = parseInt(moneyHave.textContent.replace("$", ""))
        let value = currentValue + 30;
        document.querySelector(".money-have").textContent = "$" + value;
    } else if (itemRarityColor.textContent === "Blue"){
        let currentValue = parseInt(moneyHave.textContent.replace("$", ""))
        let value = currentValue + 175;
        document.querySelector(".money-have").textContent = "$" + value;
    } else if (itemRarityColor.textContent === "Purple"){
        let currentValue = parseInt(moneyHave.textContent.replace("$", ""))
        let value = currentValue + 1000;
        document.querySelector(".money-have").textContent = "$" + value;
    }else{
        console.log("poopy")
    }
});
// Reveal pond Div
pondBtn.addEventListener("click", () => {
    pond.classList.toggle("hide");
});


// Look into canvas api