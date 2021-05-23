let id = 1000000;
function getId() {
  id++;
  return id;
}

function addCost(el, className) {
  const cost = document.createElement("select");
  cost.name = className;
  cost.classList = [className];
  cost.innerHTML = `
    <option value="">no cost</option>
    <option value="fire">fire</option>
    <option value="water">water</option>
    <option value="lightning">lightning</option>
    <option value="grass">grass</option>
    <option value="fire">fire</option>
    <option value="fighting">fighting</option>
    <option value="psychic">psychic</option>
    <option value="colorless">colorless</option>
  `;
  el.parentElement.insertBefore(
    cost,
    el.parentElement.children[el.parentElement.children.length - 1]
  );
}

function addAttack(el) {
  const attackNumber = document.querySelectorAll(".attack-number").length + 1;
  const attackDiv = document.createElement("div");
  attackDiv.classList = ["attack-container"];
  attackDiv.innerHTML = `
    <div class='attack-number'>Attack ${attackNumber}</div>
    <div class="attack">            
      <label for="attack-ability">
        <input type="checkbox" name="attack-ability" class="attack-ability">
        ability
      </label>
      <div class="costs">
        <select name="cost" class="cost">
          <option value="">no cost</option>
          <option value="fire">fire</option>
          <option value="water">water</option>
          <option value="water">water</option>
          <option value="lightning">lightning</option>
          <option value="grass">grass</option>
          <option value="fire">fire</option>
          <option value="fighting">fighting</option>
          <option value="psychic">psychic</option>
          <option value="colorless">colorless</option>
        </select>
        <button type='button' onclick='addCost(this)'>+</button>
      </div>
      <input class="attack-name" type="text" placeholder="attack name" />
      <input class="attack-description" type="text" placeholder="attack description" />
      <input class="attack-damage" type="number" />
      </div>
    </div>
  `;
  el.parentElement.insertBefore(
    attackDiv,
    el.parentElement.children[el.parentElement.children.length - 1]
  );
}

function addCard() {
  const topText = s(document.querySelector("#topText").value);
  const name = s(document.querySelector("#name").value);
  const type = s(document.querySelector("#type").value);
  const hp = s(document.querySelector("#hp").value);

  const attacksEl = document.querySelector(".attacks");
  const attackElements = Array.from(attacksEl.querySelectorAll(".attack"));
  const attacks = attackElements.map((attackEl) => {
    const costsEl = attackEl.querySelector(".costs");
    const costElements = Array.from(costsEl.querySelectorAll(".cost"));
    const attack = {
      name: s(attackEl.querySelector(".attack-name").value),
      text: s(attackEl.querySelector(".attack-description").value),
      damage: s(attackEl.querySelector(".attack-damage").value),
    }

    const cost = costElements.map((c) => s(c.value)).filter((c) => !!c);
    if (cost.length) {
      attack.cost = cost;
    }
    const type = attackEl.querySelector(".attack-ability").checked;
    if (type) {
      attack.type = 'Pokémon Power';
    }
    return attack;
  });

  /**
   * Get the values of children in a container.
   * @param {string} container class name of the container element
   * @param {string} child class name of the children elements
   * @param {string} prop property to filter for undefined values
   */
  function getChildren(container, child, prop) {
    const containerEl = document.querySelector(container);
    const childElements = Array.from(containerEl.querySelectorAll(child));
    let elements = [];
    if (prop) {
      elements = childElements
        .map((ce) => ({ [prop]: s(ce.value) }))
        .filter((e) => !!e[prop]);
    } else {
      elements = childElements.map((ce) => s(ce.value)).filter((e) => !!e);
    }
    return elements;
  }

  const weaknesses = getChildren(".weakness-costs", ".weakness-cost", "type");
  const resistances = getChildren(
    ".resistance-costs",
    ".resistance-cost",
    "type"
  );
  const retreats = getChildren(".retreat-costs", ".retreat-cost", null);

  const extraInformation = document.querySelector('#extra-information').value;
  const rarity = document.querySelector("#rarity").value;
  const image = document.querySelector("#image").value;
  const meta = document.querySelector("#meta").value;

  cards.appendChild(
    createCard(
      topText,
      name,
      hp,
      type,
      attacks,
      weaknesses,
      resistances,
      retreats,
      extraInformation,
      rarity,
      image,
      meta,
      getId()
    )
  );
}

function addDemoCard() {
  cards.appendChild(
    createCard(
      "top text",
      "name",
      "HP",
      "fire",
      [{ name: "attack name", cost: ["Colorless"], damage: 69 }],
      [],
      [],
      [],
      "extra information",
      "rare",
      "https://via.placeholder.com/200x140",
      "meta information",
      "99999"
    )
  );
}

addDemoCard();
