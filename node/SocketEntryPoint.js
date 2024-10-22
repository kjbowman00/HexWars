
const colorPalette = [
    ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#9900ff", "#ff00ff"],
    ["#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
    ["#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
    ["#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
];

class SocketEntryPoint {

    users; // UUID string list
    uuidToWs; // map of uuid to ws
    gameLoop;

    constructor(gameLoop) {
        this.uuidToWs = new Map();
        this.gameLoop = gameLoop;
    }

    kickPlayer(uuid) {
        if (this.uuidToWs.has(uuid)) {
            this.uuidToWs.get(uuid).close();
            this.uuidToWs.delete(uuid);
        }
    }

    sendMessage(uuid, msg) {
        let rawSendData;
        if (typeof msg === 'string') {
            rawSendData = msg;
        } else {
            rawSendData = JSON.stringify(msg);
        }

        const socket = this.uuidToWs.get(uuid);
        if (socket != undefined) {
            socket.send(rawSendData);
        } else {
            console.log("INVALID SOCKET ID: ", uuid);

        }

    }

    userConnected(uuid, ws) {
        this.uuidToWs.set(uuid, ws);
    }

    onMessage(uuid, data) {
        data = JSON.parse(data);
        if (data.messageType == undefined) throw "Bad message type";
        const socket = this.uuidToWs.get(uuid);
        if (socket == undefined) throw "No user with this id";

        switch (data.messageType) {
            case "play_game":
                try {
                    //Input checking
                    if (data == undefined) throw "Undefined data";

                    let name = data.name.substring(0, 15);
                    if (name == undefined) throw "Name not a string";

                    let color = colorPalette[data.color.i][data.color.j];
                    if (color == undefined) throw "Color not known";

                    if (this.gameLoop.world.players.get(uuid) != undefined) throw "Player already exists";

                    if (this.gameLoop.world.players.size >= this.gameLoop.world.MAX_PLAYERS) throw "Max Players";

                    //Add to game server
                    let startPos = this.gameLoop.world.addPlayer(uuid, name, color);
                    const msg = {messageType: "join_game_success", world: this.gameLoop.world.worldObj, startPos: startPos};
                    socket.send(JSON.stringify(msg));
                }
                catch (error) {
                    console.log(error);
                }
                break;
            case "player_input":
                try {
                    if (data == undefined) throw "Undefined data";
                    if (this.gameLoop.world.players.get(uuid) == undefined) throw "Not a player";
                    this.gameLoop.world.playerInput(uuid, data);
                }
                catch (error) {
                }
                break;
            case "player_respawn_request":
                let resReq = this.gameLoop.world.requestRespawn(uuid);
                resReq
                if (resReq.success) {
                    const msg = {messageType: "player_respawn_success", position: resReq.position};
                    socket.send(JSON.stringify(msg));
                }
                break;
            case "player_shot":
                this.gameLoop.world.playerShot(uuid);
                break;
            case "upgrade_request":
                //Check if integer
                //Check if valid upgrade int
                try {
                    const upgradeNum = data.upgradeNum;
                    if (Number.isInteger(upgradeNum)) {
                        if (upgradeNum >= 0 && upgradeNum < 3) {
                            this.gameLoop.world.upgradePlayer(uuid, upgradeNum);
                        }
                    } else throw "Not a number";
                } catch (error) {
                }
                break;
            case "get_player_count":
                let thing = {};
                thing.playerCount = this.gameLoop.world.players.size;
                thing.MAX_PLAYERS = this.gameLoop.world.MAX_PLAYERS;
                res.write(JSON.stringify(thing));
                res.end();
                break;
            case "disconnect":
                if (this.gameLoop.world.players.get(uuid) != undefined) {
                    this.gameLoop.world.removePlayer(uuid);
                }
                break;
        }
    }
}

exports.SocketEntryPoint = SocketEntryPoint;