/* global describe, it */

const expect = require('expect.js');
const TimeMaster = require('../../../lib/timeMaster/timeMaster');
const moment = require('moment');

/**
 * Shuffles array in place.
 * @param {Array} array items The array containing the items.
 */
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

describe('events tests', function () {
    it('should throw error when not TimeEvent is passed', function () {
        let timeMaster = new TimeMaster();
        let wasError = false;
        try {
            timeMaster.addEvent({});
        } catch (error) {
            wasError = true;
        }

        expect(wasError).to.be(true);
    });

    it('should not throw error when TimeEvent is passed', function () {
        let timeMaster = new TimeMaster();
        let timeEvent = TimeMaster.createEvent('event', moment(), () => {});
        let wasError = false;

        try {
            timeMaster.addEvent(timeEvent);
        } catch (error) {
            console.info('errrrrrrr', error);
            wasError = true;
            expect(true).to.be(false);
        }

        expect(wasError).to.be(false);
        expect(timeMaster.events.length).to.be(1);
        timeMaster.clear();
        expect(timeMaster.events.length).to.be(0);
    });

    it('Time event must be instance of moment', function () {
        let wasError = false;
        try {
            TimeMaster.createEvent('test', new Date(), () => {})
        } catch (error) {
            wasError = true;
        }

        expect(wasError).to.be(true);
    })

    it('should run event with given time', function (done) {
        let timeMaster = new TimeMaster();
        let timeEvent = TimeMaster.createEvent('name', moment().add(0.02, 'second'), () => {
            timeMaster.clear();
            done();
        });

        timeMaster.addEvent(timeEvent);
    });

    it('should run events in sequence', function (done) {
        let timeMaster = new TimeMaster();
        let order = [];
        let timeEvent1 = TimeMaster.createEvent('name1', moment().add(0.002, 'second'), () => order.push(timeEvent1.name));
        let timeEvent2 = TimeMaster.createEvent('name2', moment().add(0.003, 'second'), () => order.push(timeEvent2.name));
        let timeEvent3 = TimeMaster.createEvent('name3', moment().add(0.004, 'second'), () => order.push(timeEvent3.name));
        let timeEvent4 = TimeMaster.createEvent('name4', moment().add(0.005, 'second'), () => order.push(timeEvent4.name));
        let timeEvent5 = TimeMaster.createEvent('name5', moment().add(0.006, 'second'), () => order.push(timeEvent5.name));
        let events = shuffle([timeEvent1, timeEvent2, timeEvent3, timeEvent4, timeEvent5]);

        events.forEach(event => timeMaster.addEvent(event));

        setTimeout(() => {
            expect(order[0]).to.be('name1');
            expect(order[1]).to.be('name2');
            expect(order[2]).to.be('name3');
            expect(order[3]).to.be('name4');
            expect(order[4]).to.be('name5');
            expect(timeMaster.events.length).to.be(0);
            done();
        }, 10);
    });

    it('should run when they have same time', function (done) {
        let timeMaster = new TimeMaster();
        let order = [];
        let time = moment().add(0.02, 'second');
        let timeEvent1 = TimeMaster.createEvent('name1', time, () => order.push(timeEvent1.name));
        let timeEvent2 = TimeMaster.createEvent('name2', time, () => order.push(timeEvent2.name));
        let events = shuffle([timeEvent1, timeEvent2]);

        events.forEach(event => timeMaster.addEvent(event));

        setTimeout(() => {
            expect(order.length).to.be(2);
            expect(timeMaster.events.length).to.be(0);
            done();
        }, 25);
    });
});