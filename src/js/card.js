const jsonResponse = JSON.parse(cachedResponse);
const allPokemon = jsonResponse.data.filter((p) => p.supertype === "Pokémon");

const cards = document.querySelector(".cards-container");

allPokemon.forEach((pokemon) => {
  const weaknesses = pokemon.weaknesses ? pokemon.weaknesses : [];
  const retreatCost = pokemon.retreatCost ? pokemon.retreatCost : [];
  const resistances = pokemon.resistances ? pokemon.resistances : [];
  const bottomText = `${pokemon.flavorText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LV. ${pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#${pokemon.number}`;

  cards.appendChild(
    createCard(
      `${pokemon.subtypes[0]} ${pokemon.supertype}`,
      pokemon.name,
      `${pokemon.hp} HP`,
      pokemon.types[0].toLowerCase(),
      pokemon.attacks,
      weaknesses,
      resistances,
      retreatCost,
      bottomText,
      pokemon.rarity.toLowerCase(),
      pokemon.images.small,
      pokemon.number
    )
  );
});

function createAttack(attack) {
  let cost = "";
  attack.cost.forEach(
    (c) =>
      (cost += `<img class="card__attack-cost" src="./img/${c.toLowerCase()}-classic.png" />`)
  );
  return `
    <div class="card__attack-row-container">
        <div class="card__attack-row">
            <div class="card__attack-cost-container">
                ${cost}
            </div>
            <div class="card__attack-description">
                <span class="card__attack-description-name">${
                  attack.name
                }</span>
                ${
                  attack.text
                    ? `<span class="card__attack-description-details"> ${attack.text} </span>`
                    : ""
                }
            </div>
            <div class="card__attack-damage">${attack.damage}</div>
        </div>
        <div class="card__attack-stripe"></div>
    </div>
    `;
}

function getBackgroundColor(type) {
  backgroundColor = "#ddd";
  switch (type) {
    case "water":
      backgroundColor = "#5454ff";
      break;
    case "lightning":
      backgroundColor = "#ffff56";
      break;
    case "grass":
      backgroundColor = "#7aea7a";
      break;
    case "fire":
      backgroundColor = "#ff5c5c";
      break;
    case "fighting":
      backgroundColor = "#f04b25";
      break;
    case "psychic":
      backgroundColor = "#b339b3";
      break;
    case "colorless":
      backgroundColor = "#ddd";
      break;
  }
  return backgroundColor;
}

function createCard(
  subsupertype,
  name,
  hp,
  type,
  attacks,
  weaknesses,
  resistances,
  retreatCost,
  bottomText,
  rarity,
  bgImage,
  number
) {
  const card = document.createElement("div");
  card.classList = ["card"];

  let attackElements = "";
  attacks.forEach((attack) => (attackElements += createAttack(attack)));

  let weaknessEl = "";
  weaknesses.forEach(
    (weakness) =>
      (weaknessEl += `<img class="card__attack-cost" src="./img/${weakness.type.toLowerCase()}-classic.png" />`)
  );

  let resistanceEl = "";
  resistances.forEach(
    (resistance) =>
      (resistanceEl += `<img class="card__attack-cost" src="./img/${resistance.type.toLowerCase()}-classic.png" />`)
  );

  let retreatCostEl = "";
  retreatCost.forEach(
    (cost) =>
      (retreatCostEl += `<img class="card__attack-cost" src="./img/${cost.toLowerCase()}-classic.png" />`)
  );

  card.innerHTML = `
    <div class="card">
        <div class="card__inner-card">
            <div class="card__base-information">${subsupertype}</div>
            <div class="card__information">
                <div class="card__name">${name}</div>
                <div class="card__hp-type-container">
                <div class="card__hp">${hp}</div>
                <img class="card__type" src="./img/${type}-classic.png" />
                </div>
            </div>
            <div class="card__image"></div>
            <div class="card__meta">
                THIS IS FAKE
                <!-- Mouse Pokémon. Length: 1' 4'', Weight: 13 lbs. -->
            </div>
            <div class="card__attacks">
                ${attackElements}
            </div>
            <div class="card__strengths">
                <div class="card__strength-col">
                    <div>weakness</div>
                    <div class="card__strength-cost-row">
                        ${weaknessEl}
                    </div>
                </div>
                <div class="card__strength-col">
                    <div>resistance</div>
                    <div class="card__strength-cost-row">
                        ${resistanceEl}
                    </div>
                </div>
                <div class="card__strength-col">
                    <div>retreat cost</div>
                    <div class="card__strength-cost-row">
                        ${retreatCostEl}
                    </div>
                </div>
            </div>
            <div class="card__extra-information">
                ${bottomText}
            </div>
            <div class="card__rarity">
                <img src="./img/${rarity}.png" />
            </div>
        </div>
    </div>
    `;

  const innerCard = card.querySelector(".card__inner-card");
  innerCard.style.backgroundColor = getBackgroundColor(type);
  const image = innerCard.querySelector(".card__image");
  const id = `card__${number}`;
  image.id = id;
  const style = document.createElement("style");
  style.innerHTML = `
        #${id}::before {
            content: "";
            height: calc(139px - var(--border) * 2);
            width: calc(196px - var(--border) * 2);
            position: absolute;
            background-image: url("${bgImage}");
            background-position-x: 215px;
            background-position-y: -37px;
        }`;
  document.querySelector("head").appendChild(style);

  return card;
}
