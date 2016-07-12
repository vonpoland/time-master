/**
 * Time event constructor
 * @param name {string}
 * @param date {Date}
 * @param handler {function}
 * @constructor
 */
class TimeEvent {
    constructor(name, date, handler) {
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