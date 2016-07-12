const TimeEvent = require('./timeEvent');
const utils = require('./utils');

/**
 * TimeMaster constructor;
 * @constructor
 */
class TimeMaster {
    constructor() {
        this.events = [];
        this.lastEvent = null;
        this.lastTimeoutId = -1;
    }

    /**
     * Create time event.
     * @param name {string}
     * @param date {Date}
     * @param handler {function}
     * @returns {TimeEvent}
     */
    static createEvent(name, date, handler) {
        return new TimeEvent(name, date, handler);
    }

    /**
     * Add event to time master.
     * @param event {TimeEvent}
     */
    addEvent(event) {
        if (!(event instanceof TimeEvent)) {
            throw new Error('wrong event type use TimeMaster.createEvent static function in order to create event')
        }

        this.events.push(event);
        let nextEvent = utils.sortEvents(this.events)[0];
        this.handleNextEvent(nextEvent);
    }

    handleNextEvent(nextEvent) {
        if(typeof nextEvent === 'undefined') {
            return;
        }

        let onEventExecute = () => {
            let lastEventIndex = this.events.indexOf(nextEvent);

            this.events.splice(lastEventIndex, 1);
            this.handleNextEvent(utils.sortEvents(this.events)[0]);

            nextEvent.handler();
        };

        if (this.lastEvent !== nextEvent) {
            this.lastTimeoutId = utils.handleNextEvent(nextEvent, onEventExecute, this.lastTimeoutId);
            this.lastEvent = nextEvent;
        }
    }

    clear() {
        if (this.lastTimeoutId >= 0) {
            clearTimeout(this.lastTimeoutId)
        }

        this.lastEvent = null;
        this.events = [];
    }
}

module.exports = TimeMaster;