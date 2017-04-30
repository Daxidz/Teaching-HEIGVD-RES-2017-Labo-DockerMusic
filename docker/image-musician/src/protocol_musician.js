/**
 * Protocol used by the musician
 */

exports.INSTRUMENTS_TO_SOUNDS =  {
    'piano' : 'ti-ta-ti',
    'trumpet' : 'pouet',
    'flute' : 'trulu',
    'violin' : 'gzi-gzi',
    'drum' : 'boum-boum'
}

exports.MULTICAST_IP = "239.255.22.5";

exports.MULTICAST_PORT = 9907;

// time in ms before each send of the information
exports.TIME_TO_WAIT = 1000;

