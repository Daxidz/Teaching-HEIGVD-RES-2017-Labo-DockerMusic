/**
 * Protocol used by the auditor
 */

exports.SOUNDS_TO_INSTRUMENTS = {
    'ti-ta-ti': 'piano',
    'pouet': 'trumpet',
    'trulu': 'flute',
    'gzi-gzi': 'violin',
    'boum-boum': 'drum'
}

exports.MULTICAST_IP = "239.255.22.5";

exports.MULTICAST_PORT = 9907;

exports.TCP_PORT = 2205;

// time in s before a musician is considered inactive by the auditor
exports.TIME_BEFORE_INACTIVE = 5;

