var io;
var world = require('./world.js');

const nanoToSecondsMultiple = 0.000000001;
const nanoToMilliMultiple = 0.000001;
var previousEndTime = getCurrentTimeSecondsDecimal();
var updatesPaused = true;
const loop = function() {
    var timeBeginLoop = getCurrentTimeSecondsDecimal();
    var deltaTime = timeBeginLoop - previousEndTime;

    // Update
	if (!updatesPaused) {
		world.update(deltaTime, io);
		world.sendUpdates(io);
	}

    // wait 20 ms (tick rate) minus how much time this tick took to complete (5ms of game logic for example) == 15ms till next tick needs to run.
    const gameLogicTimeTaken = getCurrentTimeSecondsDecimal() - timeBeginLoop;
    previousEndTime = getCurrentTimeSecondsDecimal();
    const waitTime = 20 - (gameLogicTimeTaken * 1000);
    if (waitTime < 1) {
        setImmediate(loop);
    } else {
        setTimeout(loop, waitTime);
    }
}

function getCurrentTimeSecondsDecimal() {
    const time = process.hrtime();
    const seconds = time[0];
    const decimalSeconds = time[1] * nanoToSecondsMultiple;
    return seconds + decimalSeconds;
}

var getStarted = function (ioObject) {
	io = ioObject;
	loop();
};

var pauseUpdates = function(enable) {
	updatesPaused = enable;
}

exports.world = world;
exports.getStarted = getStarted;
exports.pauseUpdates = pauseUpdates;