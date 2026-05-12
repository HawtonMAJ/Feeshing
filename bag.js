let bagBtn = document.getElementsByClassName("bagbtn")[0];

function handleBagBtnClick(event) {
    let bag = document.querySelectorAll(".bag");
    bag.classList.toggle("hide")
}
bagBtn.addEventListener("click",handleBagBtnClick)