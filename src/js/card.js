const jsonResponse = JSON.parse(cachedResponse);
const allPokemon = jsonResponse.data.filter((p) => p.supertype === "Pokémon");

const cards = document.querySelector(".cards-container");
const exampleCards = document.querySelector(".cards-example-container");

allPokemon.forEach((pokemon) => {
  const weaknesses = pokemon.weaknesses ? pokemon.weaknesses : [];
  const retreatCost = pokemon.retreatCost ? pokemon.retreatCost : [];
  const resistances = pokemon.resistances ? pokemon.resistances : [];
  const bottomText = `${pokemon.flavorText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LV. ${pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#${pokemon.number}`;

  let attacks = [];
  if (pokemon.abilities) {
    attacks = [...pokemon.abilities];
  }

  if (pokemon.attacks) {
    attacks = [...attacks, ...pokemon.attacks];
  }

  let rarity = pokemon.rarity.toLowerCase();
  if (rarity === "rare holo") {
    rarity = "rare";
  }

  exampleCards.appendChild(
    createCard(
      `${pokemon.subtypes[0]} ${pokemon.supertype}`,
      pokemon.name,
      `${pokemon.hp} HP`,
      pokemon.types[0].toLowerCase(),
      attacks,
      weaknesses,
      resistances,
      retreatCost,
      bottomText,
      rarity,
      pokemon.images.small,
      "THIS IS FAKE",
      pokemon.number,
      {x: 215, y: -40}
    )
  );
});

function createAttack(attack, type) {
  let cost = "";
  if (attack.cost) {
    cost += `<div class="card__attack-cost-container">`;
    attack.cost.forEach(
      (c) =>
        (cost += `<img class="card__attack-cost" src="./img/${c.toLowerCase()}-classic.png" />`)
    );
    cost += `</div>`;
  }

  let damage = "";
  if (attack.damage) {
    damage += `<div class="card__attack-damage">${attack.damage}</div>`;
  }

  let attackName = "";
  let abilityColor = "#dc051e";
  switch (type) {
    case "psychic":
      abilityColor = "#3c328a";
      break;
  }
  attackName = `
    <span ${
      attack.type ? "style='color: " + `${abilityColor}` + "'" : ""
    } class="card__attack-description-name ${
    attack.type ? "card__attack-description-ability" : ""
  }">${attack.name}</span>
  `;
  return `
    <div class="card__attack-row-container">
        <div class="card__attack-row">
            ${cost}
            <div class="card__attack-description">
                ${attackName}
                ${
                  attack.text
                    ? `<span class="card__attack-description-details"> ${attack.text} </span>`
                    : ""
                }
            </div>
            ${damage}
        </div>
        <div class="card__attack-stripe"></div>
    </div>
    `;
}

function getBackgroundColor(type) {
  backgroundColor = "#ddd";
  switch (type) {
    case "water":
      backgroundColor = "#16a9ea";
      break;
    case "lightning":
      backgroundColor = "#fcf083";
      break;
    case "grass":
      backgroundColor = "#6bb07c";
      break;
    case "fire":
      backgroundColor = "#e7967d";
      break;
    case "fighting":
      backgroundColor = "#c19d86";
      break;
    case "psychic":
      backgroundColor = "#9c77bc";
      break;
    case "colorless":
      backgroundColor = "#bccfdf";
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
  meta,
  number,
  customPosition = { x: 0, y: 0 }
) {
  const card = document.createElement("div");
  card.classList = ["trading-card"];
  let attackElements = "";
  attacks.forEach((attack) => (attackElements += createAttack(attack, type)));

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
              ${meta}
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
            background-position-x: ${customPosition.x}px;
            background-position-y: ${customPosition.y}px;
        }`;
  document.querySelector("head").appendChild(style);

  return card;
}
