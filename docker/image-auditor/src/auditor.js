const dgram = require('dgram');
var net = require('net');
var moment = require('moment');
var protocol = require('./protocol_auditor')

var server = dgram.createSocket('udp4');

var musicians = new Map();

// join the multicast group
server.bind(protocol.MULTICAST_PORT, function() {
    server.addMembership(protocol.MULTICAST_IP);
});

server.on('message', function(msg, source) {

    var dataMsg = JSON.parse(msg);

    // create the musician corresponding to the sound and uuid received
    var musician = {
        'uuid': dataMsg.uuid,
        'instrument': protocol.SOUNDS_TO_INSTRUMENTS[dataMsg.sound],
        'activeSince': moment().toISOString()
    };

    // add it to the map (uuid is the key)
    musicians.set(musician.uuid, musician);

});


/**
 *  TCP server used to send informations about active musicians
 */
function TCPServer(port) {
    this.port = port;

    var server = net.createServer(function(socket) {

        // array which will contain the active musicians
        var active = new Array();

        // iterate over the musicians and add the ones actives over the last 5s to the 'active' array and delete the others
        musicians.forEach(function (musician) {
            if(moment().diff(musician.activeSince, 'seconds') < protocol.TIME_BEFORE_INACTIVE) {
                active.push(musician);
            } else {
                musicians.delete(musician.uuid);
            }
        });

        var msg = new Buffer(JSON.stringify(active, null, '\t'));
        // send the array of active musicians to the socket
        socket.write(msg);
        // close the socket
        socket.destroy();
    });
    // listen on the specified port with the specified IP
    server.listen(this.port);
}

var tcp = new TCPServer(protocol.TCP_PORT);