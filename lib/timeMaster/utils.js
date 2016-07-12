const moment = require('moment');

exports.sortEvents = events => events.sort((event1, event2) => event1.date - event2.date);

/**
 *  * Handle next event set timeout for this event.
 * @param event {TimeEvent}
 * @param handler {function}
 * @param lastTimeoutId {number}
 * @returns {number}
 */
exports.handleNextEvent = (event, handler, lastTimeoutId) => {
    let nowValue = moment().valueOf();
    let eventValue = event.date.valueOf();
    let time = eventValue - nowValue;

    clearTimeout(lastTimeoutId);

    return setTimeout(handler, time);
};