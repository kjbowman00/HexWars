const BOT_NAMES = [
	"Underwear", "Bite", "Produce", "Bomb", "Bandit", "Pickle", "Pet", "Governor", "Master",
	"King", "Queen", "Miss", "Mr", "Volcano", "Time", "Killer", "Slayer", "Boss", "The",
	"Professional", "Yeet", "Yote", "UwU", "Square", "Round", "Hexagon", "Hexagonal", "Circle",
	"Pointy", "Point", "Strong", "Weak", "Ultra", "Zoom", "Speedster", "Speedy", "Rick", "Apex",
	"Alpha", "Beta", "Omega", "Pie", "Pi", "360", "NoScope", "Boy", "Girl", "Lad", "Chad", "Brad",
	"Flying", "Bath", "Waffle", "Pancake", "Flag", "Hour", "Pizza", "Dough", "Cheese", "Cucumber",
	"Eater", "Muncher", "Chonker", "Chungus", "Big", "Small", "Little", "Tiny", "Massive", "Chunky",
	"Yeetus", "Deletus", "AHHHH", "XX", "Rain", "Cloud", "Soft", "Fluffy", "Bouncy", "Marshmallow",
	"Smores", "Crackers", "Dill", "Chill", "Heated", "Tilted", "Always", "Sometimes", "Im", "Its",
	"Maybe", "Lucky", "Ground", "Beef", "Toad", "Frog", "Mario", "Nick", "Cage", "Jelly", "Earth",
	"Quake", "Toe", "Bottle", "Ink", "Sleet", "Fog", "Iron", "Rock", "One", "Hammer", "Zesty",
	"Crabby", "Dusty", "Upset", "Curvy", "Creepy", "Violent", "Greasy", "Omniscient", "Selective",
	"Sad", "Gifted", "Goofy", "Eager", "Silly", "Early", "Jean", "Stick", "Wood", "Beaver", "Blood",
	"Sucker", "Dinosaur", "Cow", "Cat", "Dog", "Whale", "Seal", "Fox", "Trot", "Gamer", "Not",
	"Why", "Help", "Me", "Meat", "Chicken", "Farm", "Animal", "Baby", "Shark", "Sink", "Grinder",
	"Engine", "Sock", "Shirt", "Pants", "Door", "Key", "Lock", "Microwave", "Fridge", "Tile",
	"Protein", "Shake", "Calorie", "Dense", "Long", "Short", "Cable", "Internet", "Web",
	"Land", "Apple", "Orange", "Kiwi", "Blowhole", "Bumpkin", "Cabbage", "Egg", "Troglodyte",
	"EEEEEE", "Jeroo", "Jerboa", "Upgrade", "Stealer", "Nose", "Cant", "Burp", "Juicy",
	"Bent", "Spine", "Wand", "Magic", "Steve", "Right", "Now", "Democrat", "Republican", "Liberal",
	"Conservative", "Chungo", "Bungo", "Dingo", "Dongo", "Chongo", "Bingo", "Bongo", "Lil",
	"Slayer", "Waffle", "Prophet", "Quiet", "Blood", "Bloody", "Dirty", "Messy", "Cringe", "Cringy",
	"Behemoth", "Despot", "Main", "Casual", "Elephant", "Horse", "Name", "Egg", "Borgilla",
	"Hamdog", "Ham", "Dog", "Burger", "Hammer", "Sponge", "Bell", "Shop", "Cunning", "Glorious",
	"Glamorous", "Elegant", "Superb", "Delicate", "Pleasant", "Divine", "Classic", "Pacman",
	"Superman", "Batman", "Jeff", "Hubert", "Hugh", "Mungus", "Rise", "Polished", "Awesome",
	"Tiptoe", "Tip", "Flex", "Cut", "Dominate", "Fire", "Strange", "Real", "John", "Joe",
	"Bob", "Billy", "Confused", "Chubby", "Ragged", "Unfair", "Fertile", "Loose", "Irate",
	"Nimble", "Needy", "Curious", "Faithful", "Damp", "Frantic", "Tame", "Funny", "Mindless",
	"Bright", "Windy", "Legal", "Illegal", "Obnoxious", "Squalid", "Untidy", "Orange", "Yellow",
	"Red", "Green", "Blue", "Purple", "Spiteful", "Flashy", "Tearful", "Uptight", "Disastrous",
	"Jittery", "Bug", "Hug", "Squeeze", "Crunch", "Squash", "Spiritual", "Tan", "Better",
	"Successful", "Additional", "Mountainous", "Defeated", "Silky", "Croweded", "Political", "Imported",
	"Exported", "Unable", "Wide", "Logical", "Mighty", "Safe", "Financial", "Prickly", "Cactus", "Sand",
	"Desert", "Dessert", "Brownie", "Chocolate", "Cocoa", "Bean", "Beans", "Bush", "Leaf", "Leaves",
	"Pointy", "Marked", "Simple", "Simply", "Godly", "Parallel", "Perpendicular", "Orthogonal", 
	"Quirky", "Annoyed", "Beautiful", "Dramatic", "Bashful", "Resonant", "Little", "Grouchy", "Cumbersome",
	"Beserk", "Beserker", "Barbarian", "Tribal", "Pretty", "Assorted", "Fearless", "Near", "Shiny", "Reflective",
	"Puffy", "Horrible", "Tangible", "Insignificant", "Significant", "Swanky", "Loud", "Cooperative", "Practical",
	"Bewildered", "Injurred", "King", "Estate", "Relation", "Function", "Variable", "Dependent", "Independent",
	"Cousin", "Bath", "Bathtub", "Kitchen", "Sink", "Repair", "Sympathy", "Sympathetic", "History", "Repeat",
	"Itself", "Impression", "Tongue", "Customer", "Health", "Football", "Soccer", "Nature", "Pie", "Pecan",
	"Apple", "Magazine", "Model", "Hair", "Love", "Informative", "Donkey", "Department", "Reception", "College",
	"Education", "Speech", "Election", "Candidate", "Investment", "Return", "Wood", "Oak", "Bark", "Birch", "Dark",
	"Bright", "Light", "Engineer", "Scientist", "Computer", "Data", "Analyst", "Revolution", "Opinion", "Leader",
	"Medicine", "Airport", "Cigarette", "Art", "Month", "Emphasis", "Imagination", "Category", "Flight", "Grass",
	"Dirt", "Worm", "Canadian", "American", "Russian", "British", "Height", "River", "Traveler"
];
const BOT_NAME_DELIMITERS = ["", "", "", "", "", "", "", "", "", "", "", " ", " ", " ", " ", " ", " "," ", ".", "_", "-", "~"];
var upgrades = require('./upgrades.js');
const UPGRADE_TYPES = upgrades.UPGRADE_TYPES;
const UPGRADE_EFFECT_AMOUNTS = upgrades.UPGRADE_EFFECT_AMOUNTS;

const colorPalette = [
	"#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#9900ff", "#ff00ff",
	"#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79",
	"#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47",
	"#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"
];

const SIDES = { RIGHT: 0, BOTTOM: 1, LEFT: 2, TOP: 3 };

var upgradeManager;
var staticWorldObjs;
var addPlayerFunc;
var bots = []; // Stores the id to retrieve from player map
var players;
let startingBots = 25;

const NORMAL_LAST_TIME = 900; // 15 minutes to delete bot
const LAST_TIME_RANDOMNESS = 600; // 10 minutes random change

var botNum = 0;

function updateBotNumbers() {
	let botsToAdd = 0;
	if (players.size < startingBots) {
		botsToAdd = startingBots - players.size;
	}

	for (let i = 0; i < botsToAdd; i++) {
		addBot();
	}
}

function bounceBot(bot, sideHit) { //Side hit represents which side of the block the bot is on
	if (sideHit == SIDES.RIGHT) {
		bot.rotation = Math.atan2(Math.sin(bot.rotation), -Math.cos(bot.rotation));
	} else if (sideHit == SIDES.BOTTOM) {
		bot.rotation = Math.atan2( -Math.sin(bot.rotation), Math.cos(bot.rotation));
	} else if (sideHit == SIDES.LEFT) {
		bot.rotation = Math.atan2(Math.sin(bot.rotation), -Math.cos(bot.rotation));
	} else if (sideHit == SIDES.TOP) {
		bot.rotation = Math.atan2(-Math.sin(bot.rotation), Math.cos(bot.rotation));
	}
	let dist = Math.random() * 50 + 30;
	bot.xToGo = bot.x + Math.cos(bot.rotation) * dist;
	bot.yToGo = bot.y + Math.sin(bot.rotation) * dist;
}

function addBot() {
	//Get random color
	let color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

	//Get random name
	let name = "";
	let nameSize = Math.random();
	if (nameSize < 0.1) {
		//One name
		name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
	} else {
		//Double name
		let name1 = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
		let name2 = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
		let delim = BOT_NAME_DELIMITERS[Math.floor(Math.random() * BOT_NAME_DELIMITERS.length)];
		name = name1 + delim + name2;
	}
	let numRand = Math.random();
	if (numRand < 0.05) {
		name = name + Math.floor(Math.random() * 103);
	}


	addPlayerFunc(botNum, name, color);
	let bot = players.get(botNum);
	bot.bot = true;
	bot.rotation = Math.random() * 3;
	bot.target = null;
	bot.shotTimer = 0;
	let pos = findRandomPosNear(bot, 0);
	bot.xToGo = pos.x;
	bot.yToGo = pos.y;
	bot.timeToDelete = NORMAL_LAST_TIME + Math.random() * LAST_TIME_RANDOMNESS;

	bots.push(botNum);
	botNum++;
}

function hitsBox(collider) {
	for (let i = staticWorldObjs.length - 1; i >= 0; i--) {
		let obj = staticWorldObjs[i];
		if (doesCollide(collider, obj)) {
			return true;
		}
	}
	return false;
}

function doesCollide(rect1, rect2) {
	if (rect1.x < rect2.x + rect2.w &&
		rect1.x + rect1.w > rect2.x &&
		rect1.y < rect2.y + rect2.h &&
		rect1.y + rect1.h > rect2.y) {
		return true;
	}
	return false;
}

function findRandomPosNear(bot, count) {
	let pos = { x: bot.x, y: bot.y };
	if (count > 5) return pos; //Prevent endless loop if bot gets stuck somehow

	let side = Math.random();
	let distance = Math.random() * 300 + 50;
	if (side > 0.8) {
		//Randomly pick behind or to the right or left
		let diff = Math.floor(Math.random() * 2 + 1) * 1.57;
		bot.rotation += diff;

		let diff2 = Math.random() * 1.57 - 0.785;
		bot.rotation += diff2;

		if (bot.rotation > 2 * Math.PI) bot.rotation -= 2*Math.PI;
		if (bot.rotation < 0) bot.rotation += 2*Math.PI;

		//Calculate new point
		pos.x = pos.x + distance * Math.cos(bot.rotation);
		pos.y = pos.y + distance * Math.sin(bot.rotation);
	} else {
		//Randomly pick a direction in front of it
		let diff2 = Math.random() * 1.57 - 0.785;
		bot.rotation += diff2;
		if (bot.rotation > 2 * Math.PI) bot.rotation -= 2*Math.PI;
		if (bot.rotation < 0) bot.rotation += 2*Math.PI;
		pos.x = pos.x + distance * Math.cos(bot.rotation);
		pos.y = pos.y + distance * Math.sin(bot.rotation);
	}

	//Check collision
	/*if (hitsBox({ x: pos.x, y: pos.y, w: bot.w, h: bot.h })) {
		return findRandomPosNear(bot, count+1);
	}*/
	return pos;
}

function sqDist(p1, p2) {
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

function updateBot(botNum, bot, deltaTime) {
	bot.shotTimer += deltaTime;
	bot.timeToDelete -= deltaTime;

	//upgrade bot
	if (bot.levelUpInProgress) {
		bot.levelUpInProgress = false;
		let choice = Math.floor(Math.random() * 3);
		upgradeManager.upgradePlayer(bot, choice);
	}

	//If near position to head to, find new position
	//otherwise move
	if (Math.abs(bot.x - bot.xToGo) < 5 && Math.abs(bot.y - bot.yToGo) < 5) {
		let newPos = findRandomPosNear(bot, 0);
		bot.xToGo = newPos.x;
		bot.yToGo = newPos.y;
	}


	//Move towards new position
	//Get powerup mods
	let velocityMod = 1;
	velocityMod += bot.upgrades[UPGRADE_TYPES.speed] * UPGRADE_EFFECT_AMOUNTS.speed;

	let cryoSlowMod = 1;
	if (bot.cryoSlowTimer > 0) {
		bot.cryoSlowTimer -= deltaTime;
		cryoSlowMod = UPGRADE_EFFECT_AMOUNTS.cryo_rounds.velocityMod;
	}

	let velMod2 = 1;
	if (bot.upgrades[UPGRADE_TYPES.tank] > 0) velMod2 = UPGRADE_EFFECT_AMOUNTS.tank.velocityMod;
	if (bot.upgrades[UPGRADE_TYPES.speedster] > 0) {
		velMod2 = UPGRADE_EFFECT_AMOUNTS.speedster.velocityMod;
	}
	//Move
	bot.oldX = bot.x;
	bot.oldY = bot.y;
	if (Math.abs(bot.x - bot.xToGo) > 2) {
		bot.x += deltaTime * 150 * Math.cos(bot.rotation) * velocityMod * velMod2 * cryoSlowMod;
	}
	if (Math.abs(bot.y - bot.yToGo) > 2) {
		bot.y += deltaTime * 150 * Math.sin(bot.rotation) * velocityMod * velMod2 * cryoSlowMod;
	}

	//other player nearby, target them and shoot at them
	if (bot.target == null || players.get(bot.target) == undefined) {
		//Find new target
		let closest = { dist: 9999999999999, id: -1 };
		players.forEach((player, id, map) => {
			if (id != botNum) {
				let dist2 = sqDist(player, bot);
				if (dist2 < closest.dist) {
					closest.dist = dist2;
					closest.id = id;
				}
			}
		});
		//Is the closest player within a certain distance?
		if (closest.dist < 100000) {
			bot.target = closest.id;
		}
	}
	//Determine if target is too far away or dead
	if (bot.target != null) {
		let target = players.get(bot.target);
		if (target == undefined) {
			bot.target = null;
		} else if (sqDist(bot, target) > 1000000) {
			bot.target = null;
		}
		else if (!target.alive) {
			bot.target = null;
		}
	}

	//Shoot at target
	if (bot.target != null) {
		let target = players.get(bot.target);
		let xDiff = target.x - bot.x;
		let yDiff = target.y - bot.y;
		bot.gun.rotation = Math.atan2(yDiff, xDiff);

		if (bot.shotTimer > bot.gun.shotTimeNeeded) {
			bot.shotTimer = 0;
			bot.gun.shotsRequested++;
		}
	}
}

function generateStartingBots(addPlayerFunc2, players2, staticWorldObjs2, upgradeManager2) {
	upgradeManager = upgradeManager2;
	staticWorldObjs = staticWorldObjs2;
	addPlayerFunc = addPlayerFunc2;
	players = players2;
	for (let i = 0; i < startingBots; i++) {
		addBot();
	}
}

exports.generateStartingBots = generateStartingBots;
exports.updateBot = updateBot;
exports.SIDES = SIDES;
exports.bounceBot = bounceBot;
exports.updateBotNumbers = updateBotNumbers;