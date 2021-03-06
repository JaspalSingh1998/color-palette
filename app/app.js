let COLORS = ["#D82E2F", "#FF6263", "#207398", "#22CB5C", "#F7CD2E"];

const generateBtn = document.querySelector(".action__container--btn");
const template = document.querySelector("#template");
const colorContainer = document.querySelector(".colorp");
const alert = document.querySelector(".alert");

generateBtn.addEventListener("click", async (e) => {
  await fetchColors();
  updateColors();
});

function updateColors(e) {
  colorContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const templateClone = template.content.cloneNode(true);
    const card = templateClone.querySelector(".card");
    const cardEl = templateClone.querySelector(".card__color");
    const codeEl = templateClone.querySelector(".card__color--code");

    card.addEventListener("click", cardHandler);
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
  alert.textContent = `✅ ${colorCode} Copied To Clipboard`;
  alert.style.top = "0";

  setTimeout(() => {
    alert.style.top = "-100%";
  }, 2000);
}

function copyPallete(cardsEl) {
  let codes = [];
  cardsEl.forEach((card) => {
    console.log(card);
    codes.push(card.children[1].textContent);
  });
  const newEl = document.createElement("input");
  newEl.type = "text";
  newEl.value = `[${codes}]`;
  document.body.appendChild(newEl);
  newEl.select();
  document.execCommand("copy");
  newEl.remove();
  alert.textContent = `✅ Pallete Copied To Clipboard`;
  alert.style.top = "0";

  setTimeout(() => {
    alert.style.top = "-100%";
  }, 2000);
}

async function fetchColors() {
  let hex = [];
  const response = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({
      model: "default",
    }),
  });
  const data = await response.json();
  data.result.forEach((el) => {
    let newh = rgbToHex(el[0], el[1], el[2]);
    hex.push(newh);
  });
  COLORS = hex;
}

fetchColors();

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

updateColors();

const cards = [...document.querySelectorAll(".card")];

cards.forEach((card) => {
  card.addEventListener("click", cardHandler);
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    updateColors(e);
  } else if (e.code === "KeyC") {
    copyPallete(cards);
  }
});
