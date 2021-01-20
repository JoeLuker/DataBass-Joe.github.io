'use strict';

let job = "Cleric";

let level = 5;
let bab = Math.floor(level * .75);


function abilityMod(score) {
  return Math.floor((score - 10) / 2)
}

const ability = {
  strength: {score: 7}
  , dexterity: {score: 13}
  , constitution: {score: 14}
  , intelligence: {score: 7}
  , wisdom: {score: 20}
  , charisma: {score: 18}
};

for (let abilityKey in ability) {
  ability[abilityKey].mod = abilityMod(ability[abilityKey].score);
}


let acBonus = [
  {
    name: "Armor"
    , bonus: 4 + 1
    , touchAC: false
    , flatFootedAC: true
  }
  , {
    name: "Natural"
    , bonus: 0
    , touchAC: false
    , flatFootedAC: true
  }
  , {
    name: "Dodge"
    , bonus: 1
    , touchAC: true
    , flatFootedAC: false
  }
  , {
    name: "Shield"
    , bonus: 2
    , touchAC: false
    , flatFootedAC: true
  }
  , {
    name: "Dexterity"
    , bonus: ability.dexterity.mod
    , touchAC: true
    , flatFootedAC: false
  }
]


let armorClass = 10;
let touchArmorClass = 10;
let flatFootedArmorClass = 10;

function calculateArmorClass(item) {
  armorClass += item.bonus
}
function calculateTouchArmorClass(item) {
  if (item.touchAC === true) {
    touchArmorClass += item.bonus
  }
}
function calculateFlatFootedArmorClass(item) {
  if (item.flatFootedAC === true) {
    flatFootedArmorClass += item.bonus
  }
}

acBonus.forEach(calculateArmorClass)
acBonus.forEach(calculateTouchArmorClass)
acBonus.forEach(calculateFlatFootedArmorClass)


let initiative = 2;

let weapon = {
  name: "Cestus"
  , diceCount: 1
  , diceSize: 4
  , dice: function () {
    return this.diceCount + "d" + this.diceSize
  }
  , damage: function () {
    return ((this.diceSize / 2) + .5) * this.diceCount
  }
  , critRange: 20
  , critMulti: 2
};
let attackBonus = ability.dexterity.mod;
let damageBonus = ability.strength.mod;

let damage = damageBonus + weapon.damage();
let enemyAC = [12, 14, 15, 17, 18, 19, 20, 21, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 40, 42, 43, 44, 45, 46, 47, 48];

function damagePerRound(cr, hit, damage, nonCritDamage, critRange, critConfirm, critMulti) {

  let toHit = (21 - (enemyAC[cr - 1] - hit)) / 20;
  if (toHit > 0.95)
    toHit = .95;
  if (toHit < .05)
    toHit = .05;

  let preCritDamage = (damage + nonCritDamage) * toHit;
  let critHit = (21 - (enemyAC[cr - 1] - hit - critConfirm)) / 20;
  if (critHit > 0.95)
    critHit = .95;
  if (critHit < .05)
    critHit = .05;


  let critDamage = (critHit * (damage) * (21 - critRange) * .05 * (critMulti - 1));
  return (critDamage + preCritDamage).toPrecision(2);
}


// Begin Ability Score Table
let abilityTable = "<table>" +
  "  <tr>" +
  "    <th>Ability</th>" +
  "    <th>Score</th>" +
  "    <th>Modifier</th>" +
  "  </tr>";
for (let abilityKey in ability) {
  abilityTable += "<tr> <td>"
    + abilityKey.charAt(0).toUpperCase() + abilityKey.slice(1) + "</td>"
    + "<td>" + ability[abilityKey].score + "</td>"

    + "<td>" + ability[abilityKey].mod + "</td> </tr>";

}
abilityTable += "</table>";
// End Ability Score Table


// Begin Attack Table
let attackTable = "<table>" +
  "  <tr>" +
  "    <th>Weapon</th>" +
  "    <th>To Hit</th>" +
  "    <th>Dice</th>" +
  "    <th>Damage</th>" +
  "    <th>DPR</th>" +
  "  </tr>" +
  "  <tr>" +
  "    <td>" + weapon.name + "</td>" +
  "    <td>" + attackBonus + "</td>" +
  "    <td>" + weapon.dice() + "</td>" +
  "    <td>" + damageBonus + "</td>" +
  "    <td>" + damagePerRound(level, attackBonus, damage, 0, weapon.critRange, 0, weapon.critMulti) + "</td>" +
  "  </tr>" +
  "</table>";
// End Attack Table


document.getElementById("job").innerHTML = job + "<br>" + level;

document.getElementById("stat-block").innerHTML = "BAB: " + bab
  + "<br>" + "AC: " + armorClass
  + "<br>" + "Touch AC: " + touchArmorClass
  + "<br>" + "Flat-Footed AC: " + flatFootedArmorClass
  + "<br>" + "Initiative: " + initiative
;

document.getElementById("ability-scores").innerHTML = abilityTable;
document.getElementById("attack-table").innerHTML = attackTable;



let root = document.documentElement;
let x;

document.getElementById("attack-table").addEventListener("click", function () {
  if (root.style.getPropertyValue("--bg-color") === 'red') {
    x = 'green';
  } else {
    x = 'red'
  }
  root.style.setProperty("--bg-color", x);
});


con.connect(function(err) {
  if (err) throw err;
  con.query("select description_formatted from spell where id = 40;", function (err, result, fields) {
    if (err) throw err;
    document.getElementById("database-test").innerHTML = result;
  });
});




class Expando {
  constructor () {
    this._el = document.querySelector('.js-expando');
    this._elInner = document.querySelector('.js-expando-inner');
    this._elInnerInverter = document.querySelector('.js-expando-inner-inverter');
    this._expandBtn = document.querySelector('.js-expando-expand-btn');
    this._collapseBtn = document.querySelector('.js-expando-collapse-btn');
    this._content = document.querySelector('.js-content');

    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);

    this._calculate();
    this._createEaseAnimations();

    this._expandBtn.addEventListener('click', this.expand);
    this._collapseBtn.addEventListener('click', this.collapse);
  }

  expand () {
    if (this._isExpanded) {
      return;
    }
    this._isExpanded = true;
    this._applyAnimation({expand: true});
  }

  collapse () {
    if (!this._isExpanded) {
      return;
    }
    this._isExpanded = false;
    this._applyAnimation({expand: false});
  }

  toggle () {
    if (this._isExpanded) {
      return this.collapse();
    }

    this.expand();
  }

  _applyAnimation ({expand}=opts) {
    this._elInner.classList.remove('item--expanded');
    this._elInner.classList.remove('item--collapsed');
    this._elInnerInverter.classList.remove('item__contents--expanded');
    this._elInnerInverter.classList.remove('item__contents--collapsed');
    this._expandBtn.classList.remove('item__contents--expanded2');


    // Force a recalc styles here so the classes take hold.
    window.getComputedStyle(this._elInner).transform;

    if (expand) {
      this._elInner.classList.add('item--expanded');
      this._elInnerInverter.classList.add('item__contents--expanded');
      this._expandBtn.classList.add('item__contents--expanded2');

      return;
    }

    this._elInner.classList.add('item--collapsed');
    this._elInnerInverter.classList.add('item__contents--collapsed');

  }

  _calculate () {
    const elBCR = this._el.getBoundingClientRect();
    const collapsed = this._expandBtn.getBoundingClientRect();
    const expanded = this._content.getBoundingClientRect();

    const expandedWidth = Math.abs(expanded.right - elBCR.left);
    const expandedHeight = Math.abs(expanded.bottom - elBCR.top);

    const collapsedWidth = collapsed.width;
    const collapsedHeight = collapsed.height;

    const exRadius = Math.sqrt(expandedWidth * expandedWidth +
      expandedHeight * expandedHeight);
    const colRadius = collapsedWidth * 0.5;

    this._scale = (exRadius - colRadius) / colRadius;

    // Set initial sizes.
    this._el.style.width = `${expandedWidth}px`;
    this._el.style.height = `${expandedHeight}px`;

    this._elInner.style.width = `${collapsedWidth}px`;
    this._elInner.style.height = `${collapsedHeight}px`;

    this._elInner.style.transformOrigin =
      `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;
    this._elInnerInverter.style.transformOrigin =
      `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;

  }

  _createEaseAnimations () {
    let ease = document.querySelector('.ease');
    if (ease) {
      return ease;
    }

    ease = document.createElement('style');
    ease.classList.add('ease');

    const expandAnimation = [];
    const expandContentsAnimation = [];
    const expandCircleAnimation = [];
    const collapseAnimation = [];
    const collapseContentsAnimation = [];
    const collapseCircleAnimation = [];
    for (let i = 0; i <= 100; i++) {
      const step = this._ease(i/100);

      // Expand animation.
      this._append({
        i,
        step,
        start: 1,
        end: this._scale,
        outerAnimation: expandAnimation,
        innerAnimation: expandContentsAnimation
      });

      // Collapse animation.
      this._append({
        i,
        step,
        start: this._scale,
        end: 1,
        outerAnimation: collapseAnimation,
        innerAnimation: collapseContentsAnimation
      });
    }

    ease.textContent = `
      @keyframes expandAnimation {
        ${expandAnimation.join('')}
      }
      @keyframes expandContentsAnimation {
        ${expandContentsAnimation.join('')}
      }
      @keyframes collapseAnimation {
        ${collapseAnimation.join('')}
      }
      @keyframes collapseContentsAnimation {
        ${collapseContentsAnimation.join('')}
      }`;

    document.head.appendChild(ease);
    return ease;
  }

  _append ({
             i,
             step,
             start,
             end,
             outerAnimation,
             innerAnimation}=opts) {

    const scale = start + (end - start) * step;
    const invScale = 1 / scale;

    outerAnimation.push(`
      ${i}% {
        transform: scale(${scale});
      }`);

    innerAnimation.push(`
      ${i}% {
        transform: scale(${invScale});
      }`);
  }

  _clamp (value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  _ease (v, pow=4) {
    v = this._clamp(v, 0, 1);

    return 1 - Math.pow(1 - v, pow);
  }
}

new Expando();
