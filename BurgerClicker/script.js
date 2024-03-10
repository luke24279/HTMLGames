var points = 0;
var pointsPerClick = 1;
var pointsPerSecond = 0;
//Define Tech Tree and Upgrades
var techtree = [
    {
        name: 'Patty',
        description: 'A basic patty, nothing special.',
        stats: "Doubles Points Per Click Permanently",
        price: 250,
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
    },
    {
        name: "Cheese",
        description: "A slice of cheese, adds flavor to the burger.",
        stats: "All Burger Flipping Hands are 5% cheaper",
        price: 1000,
        requirements: [],
        unlocked: false,
        bought: false,
        tier: 1,
        effect: function () {
            upgrades[0].price *= 0.95;
            console.log("Cheese bought");
        }
    },
    {
        name: "Lettuce",
        description: "Adds a bit of crunch to the burger.",
        stats: "All Robotic Spatulas are 5% cheaper",
        price: 5000,
        requirements: [],
        unlocked: false,
        bought: false,
        tier: 1,
        effect: function () {
            upgrades[1].price *= 0.95;
            console.log("Lettuce bought");
        }
    },
    {
        name: "Tomato",
        description: "Adds a bit of juiciness to the burger.",
        stats: "All Burger Assembly Lines are 5% cheaper",
        price: 10000,
        requirements: [],
        unlocked: false,
        bought: false,
        tier: 1,
        effect: function () {
            upgrades[2].price *= 0.95;
            console.log("Tomato bought");
        }
    },
    {
        name: "Double Patty",
        description: "Two patties, double the filling.",
        stats: "Doubles Points Per Click Permanently",
        price: 25000,
        requirements: [],
        unlocked: false,
        bought: false,
        tier: 1,
        effect: function () {
            pointsPerClick *= 2;
            upgrades[0].effect = function () {
                pointsPerClick += 0.4;
                console.log("Burger Flipping Hand bought");
            }
        }
    },
    {
        name: "Toasted Bun",
        description: "A bun that has been toasted to perfection.",
        stats: "Points Per Second is Increased by 50%",
        price: 50000,
        requirements: [],
        unlocked: false,
        bought: false,
        tier: 1,
        effect: function () {
            pointsPerSecond *= 1.5;
            console.log("Toasted Bun bought");
            //Edit pointsPerSecondFunction to be 1.5x
            pointsPerSecondFunction = function () {
                points += (pointsPerSecond * 1.5) / 4;
                updateText();
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
    },
    {
        name: "Burger Assembly Line",
        description: "Automatically assembles burgers for you.",
        price: 100 * Math.pow(this.priceMultiplier, (this.totalBought) ? this.totalBought : 0),
        priceMultiplier: 1.2,
        requirements: [],
        unlocked: false,
        totalBought: 0,
        effect: function () {
            pointsPerSecond += 1;
            console.log("Burger Assembly Line bought");
        }
    }
]







//Run loadGame(), and if there is save data, add the effect fuctions to the upgrades and techtree items
loadGame();
if (!techtree[0].effect) {
    techtree[0].effect = function () {
        pointsPerClick *= 2;
        //I want the upgrades[0].effect's first line in the function to now be +0.2 instead of +0.1
        upgrades[0].effect = function () {
            pointsPerClick += 0.2;
            console.log("Burger Flipping Hand bought");
        }
    }
    if (techtree[0].bought) {
        upgrades[0].effect = function () {
            pointsPerClick += 0.2;
            console.log("Burger Flipping Hand bought");
        }
    }
}
if (!techtree[1].effect) {
    techtree[1].effect = function () {
        upgrades[0].price *= 0.95;
        console.log("Cheese bought");
    }
}
if (!techtree[2].effect) {
    techtree[2].effect = function () {
        upgrades[1].price *= 0.95;
        console.log("Lettuce bought");
    }

}
if (!techtree[3].effect) {
    techtree[3].effect = function () {
        upgrades[2].price *= 0.95;
        console.log("Tomato bought");
    }

}
if (!techtree[4].effect) {
    techtree[4].effect = function () {
        pointsPerClick *= 2;
        upgrades[0].effect = function () {
            pointsPerClick += 0.4;
            console.log("Burger Flipping Hand bought");
        }
    }
}
if (!techtree[5].effect) {
    techtree[5].effect = function () {
        pointsPerSecond *= 1.5;
        console.log("Toasted Bun bought");
        //Edit pointsPerSecondFunction to be 1.5x
        pointsPerSecondFunction = function () {
            points += (pointsPerSecond * 1.5) / 4;
            updateText();
        }
    }
}
if (!upgrades[0].effect) {
    upgrades[0].effect = function () {
        pointsPerClick += 0.1;
        console.log("Burger Flipping Hand bought");
    }
}
if (!upgrades[1].effect) {
    upgrades[1].effect = function () {
        pointsPerSecond += 0.1;
        console.log("Robotic Spatula bought");
    }
}
if (!upgrades[2].effect) {
    upgrades[2].effect = function () {
        pointsPerSecond += 1;
        console.log("Burger Assembly Line bought");
    }
}
updateText();
upgrades[1].requirements.push("upgrades[0].totalBought >= 5");
upgrades[2].requirements.push("upgrades[1].totalBought >= 25");
techtree[1].requirements.push("techtree[0].bought");
techtree[2].requirements.push("techtree[1].bought");
techtree[3].requirements.push("techtree[2].bought");
techtree[4].requirements.push("techtree[3].bought", "!techtree[5].bought");
techtree[5].requirements.push("techtree[3].bought", "!techtree[4].bought");


















//Define functions
function rounded(number) {
    return Math.round(number * 10) / 10;
}

function clickBurger() {
    points += pointsPerClick;
    points = Math.round(points * 1000) / 1000;
    updateText();
}

function pointsPerSecondFunction() {
    points += pointsPerSecond / 4;
    points = Math.round(points * 1000) / 1000;
    updateText();
}
setInterval(pointsPerSecondFunction, 1000 / 4);

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
                document.getElementById(i + "upgrade").disabled = false;
            }
        }

    }
    for (var i = 0; i < techtree.length; i++) {
        let tech = techtree[i];
        let tempset = new Set();
        //if (tech.unlocked) continue;
        if (tech.requirements.length > 0) {
            for (var j = 0; j < tech.requirements.length; j++) {
                let requirement = tech.requirements[j];
                if (eval(requirement)) {
                    tempset.add(true);
                }
                else {
                    tempset.add(false);
                }
            }
            if (tempset.has(true) && !tempset.has(false) && !tech.bought) {
                tech.unlocked = true;
                document.getElementById(i + "tech").hidden = false;
            }
            // Allows for a split tech tree, where you can only buy the techs on one side of the tree
            else {
                tech.unlocked = false;
                document.getElementById(i + "tech").hidden = true;
            }
        }

    }
}

function updateText() {
    document.getElementById('points').innerText = rounded(points) + " points";
    document.getElementById('pointsPerSecond').innerText = rounded(pointsPerSecond) + " points per second";
    document.getElementById('pointsPerClick').innerText = rounded(pointsPerClick) + " points per click";
}

// Save game state
function saveGame() {
    var gameData = {
        techtree: techtree,
        upgrades: upgrades,
        // Add other game variables here
        points: points,
        pointsPerClick: pointsPerClick,
        pointsPerSecond: pointsPerSecond
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Load game state
function loadGame() {
    var savedData = localStorage.getItem('gameData');
    if (savedData) {
        savedData = JSON.parse(savedData);
        if (savedData.techtree) techtree = savedData.techtree;
        if (savedData.upgrades) upgrades = savedData.upgrades;
        if (savedData.points) points = savedData.points;
        if (savedData.pointsPerClick) pointsPerClick = savedData.pointsPerClick;
        if (savedData.pointsPerSecond) pointsPerSecond = savedData.pointsPerSecond;
        // Load other game variables here
    }
}

function restart() {
    // Ignore the window.onbeforeunload event
    window.onbeforeunload = null;
    localStorage.removeItem('gameData');
    location.reload();
}
























//Create buttons for each upgrade and techtree item
for (var i = 0; i < upgrades.length; i++) {
    let upgrade = upgrades[i];
    let button = document.createElement('button');
    button.innerText = upgrade.name + " - " + rounded(upgrade.price) + " points";
    button.name = upgrade.name;
    button.id = i + "upgrade";
    button.disabled = !upgrade.unlocked;
    button.addEventListener('click', function () {
        if (points >= upgrade.price) {
            upgrade.effect();
            points -= upgrade.price;

            upgrade.totalBought += 1;
            upgrade.price = upgrade.price * upgrade.priceMultiplier;
            //Update cost
            //Update button text 
            button.innerText = upgrade.name + " - " + rounded(upgrade.price) + " points";
            updateText();
            updateRequirements();
        }
    });
    document.getElementById('upgrades').appendChild(button);
}

document.getElementById("techtreeDialog").appendChild(document.createElement('br'));



//Add buttons to access each tier of the tech tree
for (let i = 1; i <= 2; i++) {
    let button = document.createElement('button');
    button.innerText = "Tier " + i;
    button.addEventListener('click', function () {
        for (let tier1 of document.getElementsByClassName('tier1')) {
            tier1.hidden = true;
        }
        for (let tier2 of document.getElementsByClassName('tier2')) {
            tier2.hidden = true;
        }
        for (let show of document.getElementsByClassName('tier' + i)) {
            //Only show the ones that are unlocked and not bought
            //Show is the button on the html file, find the techtree item that matches the name of the button
            let tech = techtree.find(tech => tech.name === show.name);
            if (tech.bought) continue;
            if (!tech.unlocked) continue;
            show.hidden = false;
        }
    });
    document.getElementById('techtreeDialog').appendChild(button);
}



document.getElementById("techtreeDialog").appendChild(document.createElement('br'));
for (var i = 0; i < techtree.length; i++) {
    //Create a button for each techtree item
    let tech = techtree[i];
    let button = document.createElement('button');
    button.innerText = tech.name + " - " + rounded(tech.price) + " points";
    //When hovering over, display description and stats
    button.title = tech.description + "\n" + tech.stats;
    button.name = tech.name;
    button.id = i + "tech";
    //Give button a class
    button.classList.add("tier" + tech.tier);
    if (!tech.unlocked || tech.bought) button.hidden = true;
    button.addEventListener('click', function () {
        //log the tech's class
        if (points >= tech.price) {
            tech.effect();
            points -= tech.price;
            updateText();
            tech.bought = true;
            button.hidden = true;
            updateRequirements();
        }
    });
    document.getElementById('techtreeDialog').appendChild(button);
}







// Save game state when the window is about to be closed
window.onbeforeunload = function () {
    saveGame(); // Call your function here
    return null; // In some browsers, a string returned here will be displayed in a confirmation dialog
};


