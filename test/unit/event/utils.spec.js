/* global describe, it */

const expect = require('expect.js');
const TimeMaster = require('../../../lib/timeMaster/timeMaster');
const moment = require('moment');
const utils = require('../../../lib/timeMaster/utils');
const nop = () => {};

describe('event utils tests', function () {
    it('should throw error when not TimeEvent is passed', function () {
        var date1 = moment('2015-10-10').add(5, 'seconds');
        var date2 = moment('2015-10-10').add(10, 'seconds');
        var date3 = moment('2015-10-10').add(25, 'seconds');

        let event1 = TimeMaster.createEvent('event1', date1, nop);
        let event2 = TimeMaster.createEvent('event2', date2, nop);
        let event3 = TimeMaster.createEvent('event3', date3, nop);

        let events = utils.sortEvents([event3, event1, event2]);

        expect(events[0]).to.be(event1);
        expect(events[1]).to.be(event2);
        expect(events[2]).to.be(event3);
    });
});