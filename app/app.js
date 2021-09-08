const COLORS = ["#D82E2F", "#FF6263", "#207398", "#22CB5C", "#F7CD2E"];

const generateBtn = document.querySelector(".action__container--btn");
const template = document.querySelector("#template");
const colorContainer = document.querySelector(".colorp");

const cards = [...document.querySelectorAll(".card")];

generateBtn.addEventListener("click", (e) => {
  updateColors();
});

cards.forEach((card) => {
  card.addEventListener("click", cardHandler);
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    updateColors(e);
  } else if (e.code === "KeyC") {
    copyPallete();
  }
});

function updateColors(e) {
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

function cardHandler(e) {
  const colorCode = e.target.children[1].textContent;
  const newEl = document.createElement("input");
  newEl.type = "text";
  newEl.value = colorCode;
  document.body.appendChild(newEl);
  newEl.select();
  document.execCommand("copy");
  newEl.remove();
}

function copyPallete() {
  let codes = [];
  cards.forEach((card) => {
    codes.push(card.children[1].textContent);
  });
  const newEl = document.createElement("input");
  newEl.type = "text";
  newEl.value = `[${codes}]`;
  document.body.appendChild(newEl);
  newEl.select();
  document.execCommand("copy");
  newEl.remove();
}
