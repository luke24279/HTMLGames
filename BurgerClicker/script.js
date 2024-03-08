var points = 1000;
var pointsPerClick = 1;
var pointsPerSecond = 0;

document.getElementById('points').innerText = points + " points";
document.getElementById('pointsPerSecond').innerText = pointsPerSecond + " points per second";
document.getElementById('pointsPerClick').innerText = pointsPerClick + " points per click";




var techtree = [
    {
        name: 'Patty',
        description: 'A basic patty, nothign special.',
        stats: "Doubles Points Per Second Permanently",
        price: 1,
        requirements: [],
        unlocked: true,
        bought: false,
        tier: 1,
        effect: function () {
            pointsPerClick *= 2;
            //I want the upgrades[0].effect's first line in the function to now be +0.2 instead of +0.1
            upgrades[0].effect = function () {
                pointsPerClick += 0.2;
                console.log("Burger Flipping Hand bought");
            }
        }
    }
]

var upgrades = [
    {
        name: 'Burger Flipping Hand',
        description: 'Increase the amount of points you get per burger click.',
        price: 10 * Math.pow(this.priceMultiplier, (this.totalBought) ? this.totalBought : 0),
        priceMultiplier: 1.1,
        requirements: [],
        unlocked: true,
        totalBought: 0,
        effect: function () {
            pointsPerClick += 0.1;
            console.log("Burger Flipping Hand bought");
        }
    },
    {
        name: "Robotic Spatula",
        description: "An AI controlled spatula that flips burgers for you.",
        price: 50 * Math.pow(this.priceMultiplier, (this.totalBought) ? this.totalBought : 0),
        priceMultiplier: 1.1,
        requirements: [],
        unlocked: false,
        totalBought: 0,
        effect: function () {
            pointsPerSecond += 0.1;
            console.log("Robotic Spatula bought");
        }
    }
]

upgrades[1].requirements.push("upgrades[0].totalBought >= 5");



function rounded(number) {
    return Math.round(number * 10) / 10;

}
function clickBurger() {
    points += pointsPerClick;
    points = rounded(points);
    document.getElementById('points').innerText = points + " points";
}

for (var i = 0; i < upgrades.length; i++) {
    let upgrade = upgrades[i];
    let button = document.createElement('button');
    button.innerText = upgrade.name + " - " + upgrade.price + " points";
    button.name = upgrade.name;
    button.id = i
    button.disabled = !upgrade.unlocked;
    button.addEventListener('click', function () {
        if (points >= upgrade.price) {
            upgrade.effect();
            points -= upgrade.price;
            points = rounded(points);
            upgrade.totalBought += 1;
            upgrade.price = upgrade.price * upgrade.priceMultiplier;
            //Update cost
            //Update button text 
            button.innerText = upgrade.name + " - " + rounded(upgrade.price) + " points";
            document.getElementById('points').innerText = points + " points";
            document.getElementById('pointsPerSecond').innerText = rounded(pointsPerSecond) + " points per second";
            document.getElementById('pointsPerClick').innerText = rounded(pointsPerClick) + " points per click";
            updateRequirements();
        }
    });
    document.getElementById('upgrades').appendChild(button);
}


for (var i = 0; i < techtree.length; i++) {
    //Create a button for each techtree item
    let tech = techtree[i];
    let button = document.createElement('button');
    button.innerText = tech.name + " - " + tech.price + " points";
    //When hovering over, display description and stats
    button.title = tech.description + "\n" + tech.stats;
    button.name = tech.name;
    button.id = i
    button.hidden = !tech.unlocked;
    button.addEventListener('click', function () {
        if (points >= tech.price) {
            tech.effect();
            points -= tech.price;
            points = rounded(points);
            document.getElementById('points').innerText = points + " points";
            tech.bought = true;
            button.hidden = true;
            updateRequirements();
        }
    });
    document.getElementById('techtreeDialog').appendChild(document.createElement('br'));
    document.getElementById('techtreeDialog').appendChild(button);
}


function updateRequirements() {
    for (var i = 0; i < upgrades.length; i++) {
        let upgrade = upgrades[i];
        let tempset = new Set();
        if (upgrade.unlocked) continue;
        if (upgrade.requirements.length > 0) {
            for (var j = 0; j < upgrade.requirements.length; j++) {
                let requirement = upgrade.requirements[j];
                if (eval(requirement)) {
                    tempset.add(true);
                }
                else {
                    tempset.add(false);
                }
            }
            if (tempset.has(true) && !tempset.has(false)) {
                upgrade.unlocked = true;
                document.getElementById(i).disabled = false;
            }
        }

    }
}

function pointsPerSecondFunction() {
    points += pointsPerSecond;
    points = rounded(points);
    document.getElementById('points').innerText = points + " points";
}
setInterval(pointsPerSecondFunction, 1000);