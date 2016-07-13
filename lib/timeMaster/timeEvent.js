const moment = require('moment');

/**
 * Time event constructor
 * @param name {string}
 * @param date {moment}
 * @param handler {function}
 * @constructor
 */
class TimeEvent {
    constructor(name, date, handler) {
        if(!(date instanceof moment)) {
            throw new Error('Event date have to be instance of moment')
        }

        this.name = name;
        this.date = date;
        this.handler = handler;
        this._wasTriggered = false;
    }

    get wasTriggered() {
        return this._wasTriggered;
    }
}

module.exports = TimeEvent;