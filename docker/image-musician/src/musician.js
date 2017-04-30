var dgram = require('dgram');
const uuidV4 = require('uuid/v4');

var protocol = require('./protocol_musician')

var server = dgram.createSocket('udp4');


/**
 * Class used to create a musician by the type of his instrument. It then sends its information by UDP on a Multicast
 * socket using the IP provided in the protocol.
 * @param type
 * @constructor
 */
function Musician (type) {

    this.type = type;
    this.uuid = uuidV4();

    var description = {
        'uuid': this.uuid,
        'sound': protocol.INSTRUMENTS_TO_SOUNDS[type]
    };

    // function to send the sound of the instrument by UPD Multicast
    Musician.prototype.sendSound = function() {

        var msg = new Buffer(JSON.stringify(description));

        server.send(msg, 0, msg.length, protocol.MULTICAST_PORT, protocol.MULTICAST_IP);

    }

    // This call the function each TIME_TO_WAIT ms (1s in the specs case)
    setInterval(this.sendSound, protocol.TIME_TO_WAIT);
}


// We check if an instrument was provided and, if so, if it exist in the list of instruments
if (process.argv[2] in protocol.INSTRUMENTS_TO_SOUNDS) {
    var type = process.argv[2];
    var m1 = new Musician(type);
} else {
    // if argv[2] is empty
    if (process.argv[2] == undefined)
        console.log("Error you must provide an instrument!");
    // if it is a wrong or unresistant instrument
    else
        console.log("Error: the instrument you provided is invalid!");
}






