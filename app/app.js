const COLORS = ["#D82E2F", "#FF6263", "#207398", "#22CB5C", "#F7CD2E"];

const generateBtn = document.querySelector(".action__container--btn");
const template = document.querySelector("#template");
const colorContainer = document.querySelector(".colorp");

generateBtn.addEventListener("click", (e) => {
  updateColors();
});

function updateColors(e) {
  e.stopPropagation();
  colorContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const templateClone = template.content.cloneNode(true);
    const cardEl = templateClone.querySelector(".card__color");
    const codeEl = templateClone.querySelector(".card__color--code");

    cardEl.style.backgroundColor = COLORS[i];
    codeEl.textContent = COLORS[i];

    colorContainer.appendChild(templateClone);
  }
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    updateColors(e);
  }
});
