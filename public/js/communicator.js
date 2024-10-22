/*jshint esversion: 6 */
var socket;

function onPlay() {
    var form = document.getElementById("name_form");
	var formData = new FormData(form);
	socketStuff(formData);
	return false;
}
document.getElementById("name_form").onsubmit = onPlay;
var count = 0;

// Queue messages while websocket is CONNECTING - send after CONNECTED

function socketStuff(formData) {
    var gameName = formData.get('server');

    let playerColor = "#" + $('#color_picker').spectrum("get").toHex();
    let pColor = playerColor;
    playerColor = getColorIndexFromPalette(playerColor); //For sending to the server in weird form

    var path = window.location.origin.replace('http', 'ws') + '/ws/';
    socket = new WebSocket(path);

    this.socket.onopen = (event) => {
        var playGameMsg = {messageType: 'play_game',
            name: formData.get('username'),
            color: playerColor
        };
        socket.send(JSON.stringify(playGameMsg));
    }

    this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.messageType) {
            case 'join_game_success':
                //Initialize player attributes
                initializeWorldObjects();
                player = {
                    x: 0, y: 0, w: 50, h: 50, oldX: 0, oldY: 0, xVel: 0, yVel: 0, name: "None", health: 100, maxHealth: 100,
                    gun: { w: 50, h: 10, rotation: 0 },
                    activePowerups: [],
                    orbs: 0, kills: 0,
                    upgrades: [0, 0, 0, 0, 0, 0, 0],
                    availableUpgrades: [0, 0, 0],
                    color: pColor,
                    name : formData.get("username")
                };
                serverPlayerState = { x: 0, y: 0, xVel: 0, yVel: 0, activePowerups: [] };

                world = data.world;
                player.x = data.startPos.x;
                player.y = data.startPos.y;
                player.oldX = player.x;
                player.oldY = player.y;
                serverPlayerState.x = player.x;
                serverPlayerState.y = player.y;
                gameStart();
                break;
            case 'state':
                worldObjsOld.orbs.forEach((obj, id, map) => {
                    let newObj = worldObjsUpdated.orbs.get(id);
                    if (newObj != undefined) {
                        let trail = obj.trail;
                        newObj.trail = obj.trail;

                        newObj.grdCanvas = obj.grdCanvas;
                    }
                });
                worldObjsOld.players.forEach((obj, id, map) => {
                    let newObj = worldObjsUpdated.players.get(id);
                    if (newObj != undefined) {
                        //Move over trail object
                        let trail = obj.trail;
                        newObj.trail = obj.trail;
                    }
                });
                worldObjsOld = worldObjsUpdated;

                worldObjsUpdated = {};
                worldObjsUpdated.players = new Map(data.objects.players);
                worldObjsUpdated.bullets = new Map(data.objects.bullets);
                worldObjsUpdated.orbs = new Map(data.objects.orbs);

                worldObjsUpdated.players.forEach((obj, id, map) => {
                    //Grab x and y 
                    //TODO: Remove this - stop using "pos"
                    obj.x = obj.pos.x;
                    obj.y = obj.pos.y;
                });
                worldObjsUpdated.orbs.forEach((obj, id, map) => {
                    //Grab position data
                    //TODO: Remove this - stop using "pos"
                    obj.x = obj.pos.x;
                    obj.y = obj.pos.y;
                    obj.xToGo = obj.pos.xToGo;
                    obj.yToGo =  obj.pos.yToGo;
               });

                worldObjsOld.orbs.forEach((obj, id, map) => {
                    let newObj = worldObjsUpdated.orbs.get(id);
                    if (newObj == undefined) {
                        worldObjsUpdated.orbs.set(id, obj);
                    }
                });

                //Grab all bullets and move them over
                worldObjsOld.bullets.forEach((obj, id, map) => {
                    let newObj = worldObjsUpdated.bullets.get(id);
                    if (newObj == undefined) worldObjsUpdated.bullets.set(id, obj);
                });

                worldObjsOld.players.forEach((obj, id, map) => {
                    let newObj = worldObjsUpdated.players.get(id);
                    if (newObj != undefined) {
                        //Handle things that got changed
                        if (newObj.health == undefined) newObj.health = obj.health;
                        if (newObj.maxHealth == undefined) newObj.maxHealth = obj.maxHealth;
                        if (newObj.gun == undefined) {
                            newObj.gun = {};
                            newObj.gun.rotation = obj.gun.rotation;
                        }
                        if (newObj.upgrades == undefined) newObj.upgrades = obj.upgrades;
                        if (newObj.name == undefined) newObj.name = obj.name;
                        if (newObj.color == undefined) newObj.color = obj.color;
                    }
                })

                //Delete bullets server told us to
                let serverMarkedBullets = data.objects.bulletsMarkedForExplosion;
                for (let i = serverMarkedBullets.length - 1; i >= 0; i--) {
                    let id = serverMarkedBullets.pop();
                    worldObjsOld.bullets.delete(id);
                    worldObjsUpdated.bullets.delete(id);
                }
                //Delete orbs server told us to
                let orbsToDelete = data.objects.orbsToDelete;
                for (let i = orbsToDelete.length - 1; i >= 0; i--) {
                    let id = orbsToDelete.pop();
                    worldObjsOld.orbs.delete(id);
                    worldObjsUpdated.orbs.delete(id);
                }

                if (data.leaderboard != undefined) leaderboard = data.leaderboard;

                powerupObjs = data.objects.powerups;

                if (data.player.playersJustKilled != undefined) {
                    let killInfo = data.player.playersJustKilled;
                    for (let i = 0; i < killInfo.length; i++) {
                        killInfoArray.push(killInfo[i]);
                    }
                }

                /*let bulletsToExplode = data.objects.bulletsMarkedForExplosion;
                for (let i = 0; i < bulletsToExplode.length; i++) {
                    console.log("Bullet " + bulletsToExplode[i] + " exploded!");
                }*/
                let deadPlayers = data.objects.deadPlayers;
                for (let i = deadPlayers.length - 1; i >= 0; i--) {
                    let current = deadPlayers[i];
                    let deadPlayer = worldObjsOld.players.get(current);
                    if (deadPlayer != undefined) {
                        deathAnimations.push(new deathAnimator(
                            deadPlayer.x,
                            deadPlayer.y,
                            50,
                            50,
                            hexToRGB(deadPlayer.color)
                        ));
                    }
                }

                serverPlayerState = data.player;
                //TODO: Stop using pos
                serverPlayerState.x = serverPlayerState.pos.x;
                serverPlayerState.y = serverPlayerState.pos.y;
                //if (serverPlayerState.health < player.health) Sounds.playDamageSound();
                if (serverPlayerState.health != undefined) player.health = serverPlayerState.health;
                player.orbs = serverPlayerState.orbs;
                player.orbsToUpgrade = serverPlayerState.orbsToUpgrade;
                player.kills = serverPlayerState.kills;
                player.maxHealth = serverPlayerState.maxHealth;
                player.levelUpInProgress = serverPlayerState.levelUpInProgress;
                player.availableUpgrades = serverPlayerState.availableUpgrades;
                player.cryoSlowTimer = serverPlayerState.cryoSlowTimer;
                player.upgrades = serverPlayerState.upgrades;

                handleInitialPowerup(serverPlayerState);
                player.activePowerups = serverPlayerState.activePowerups;

                lastInput.xVel = playerSpeed * xDir;
                lastInput.yVel = playerSpeed * yDir;
                //Send current input
                lastInputTime = performance.now();
                socket.send(JSON.stringify({
                    messageType: 'player_input',
                    xDir: xDir,
                    yDir: yDir,
                    rotation: player.gun.rotation
                }));
                break;
            case 'player_respawn_success':
                respawnSuccess(data.position);
                break;
            case 'disconnect':
                toMenu();
                break;
        }
    }

}

function sendBullet() {
    socket.send(JSON.stringify({messageType: 'player_shot'}));
}

function sendUpgradeRequest(upgradeNum) {
    socket.send(JSON.stringify({messageType: 'upgrade_request', upgradeNum: upgradeNum}));
}