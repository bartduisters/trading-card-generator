const jsonResponse = JSON.parse(cachedResponse);
const allPokemon = jsonResponse.data.filter(p => p.supertype === 'Pokémon');

const pokemon = allPokemon.filter(p => p.name === 'Pikachu')[0];
console.log(allPokemon);
console.log(pokemon);

const cards = document.querySelector('.cards-container');
cards.appendChild(createCard(`${pokemon.subtypes[0]} ${pokemon.supertype}`, pokemon.name, `${pokemon.hp} HP`, pokemon.types[0], pokemon.attacks));

function createAttack(attack) {
    console.log('attack: ', attack);
    let cost = '';
    attack.cost.forEach(c => cost += `<img class="card__attack-cost" src="./img/${c.toLowerCase()}-classic.png" />`);
    console.log('cost: ', cost);
    return `
    <div class="card__attack-row-container">
        <div class="card__attack-row">
            <div class="card__attack-cost-container">
                ${cost}
            </div>
            <div class="card__attack-description">
                <span class="card__attack-description-name">${attack.name}</span>
                ${attack.text ? `<span class="card__attack-description-details"> ${attack.text} </span>` : ''}
            </div>
            <div class="card__attack-damage">${attack.damage}</div>
        </div>
        <div class="card__attack-stripe"></div>
    </div>
    `
}

function createCard(subsupertype, name, hp, type, attacks) {
    const card = document.createElement('div');
    card.classList = ['card'];
    
    let attackElements = '';
    attacks.forEach(attack => attackElements += createAttack(attack));
  
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
                Mouse Pokémon. Length: 1' 4'', Weight: 13 lbs.
            </div>
            <div class="card__attacks">
                ${attackElements}
            </div>
            <div class="card__strengths">
                <div class="card__strength-col">
                    <div>weakness</div>
                    <div class="card__strength-cost-row">
                        <img class="card__attack-cost" src="./img/fighting-classic.png" />
                    </div>
                </div>
                <div class="card__strength-col">
                    <div>resistance</div>
                    <div class="card__strength-cost-row">
                    <!-- <img class="card__attack-cost" src="./img/water-classic.png" /> -->
                    </div>
                </div>
                <div class="card__strength-col">
                    <div>retreat cost</div>
                    <div class="card__strength-cost-row">
                        <img
                        class="card__attack-cost"
                        src="./img/colorless-classic.png"
                        />
                    </div>
                </div>
            </div>
            <div class="card__extra-information">
                When several of these Pokémon gather, their electricity can cause lightning storms.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LV. 12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#25
            </div>
            <div class="card__rarity">
                <img src="./img/common.png" />
            </div>
        </div>
    </div>
    `
    return card;
}