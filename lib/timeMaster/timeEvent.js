const moment = require('moment');

exports.sortEvents = function (events) {
    return events.sort(function (event1, event2) {
        return event1.date - event2.date
    })
};

/**
 * Handle next event set timeout for this event.
 * @param event {TimeEvent}
 * @param handler {function}
 * @param lastTimeoutId {number}
 * @returns {number}
 */
exports.handleNextEvent = function (event, handler, lastTimeoutId) {
    var nowValue = moment().valueOf();
    var eventValue = event.date.valueOf();
    var time = eventValue - nowValue;

    clearTimeout(lastTimeoutId);

    return setTimeout(handler, time);
};