/*jshint esversion: 6 */
function onPlay() {
    var form = document.getElementById("name_form");
    console.log('play');
    document.getElementById('form_box').style.display = 'none';
	var formData = new FormData(form);
	socketStuff(formData);
	return false;
}

document.getElementById("name_form").onsubmit = onPlay;

function socketStuff(formData) {
	var gameName = formData.get('server');
	var path = '/' + gameName + '/socket.io';
    const socket = io('/', {
        secure: true,
        rejectUnauthorized: false,
        path: path
    });

    socket.on('test1', function(data) {
        console.log('Test1 receieved');
    });
    socket.on('state', function (data) {
        console.log(data);

    });

    socket.emit('play_game', formData.get('username'));

}