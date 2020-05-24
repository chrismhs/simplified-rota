import {Rota} from "../../src/utils/Rota";
import {expect} from "chai";
import {CalendarEntry} from "../../src/utils/RotaApi";

describe('Rota', () => {
    describe('getAllStaff', () => {
        it('gets all members from calendar events', () => {
            const rota = new Rota([
                {assignees: ["Fred Bloggs"]},
                {assignees: ["Joe Smith"]},
                {assignees: ["Jean Dupont"]},
            ] as CalendarEntry[]);

            expect(rota.allStaff().sort()).to.eql([
                "Fred Bloggs", "Jean Dupont", "Joe Smith"
            ]);
        });

        it('ignores duplicates', () => {
            const rota = new Rota([
                {assignees: ["Fred Bloggs"]},
                {assignees: ["Fred Bloggs"]},
                {assignees: ["Joe Smith"]},
            ] as CalendarEntry[]);

            expect(rota.allStaff().sort()).to.eql([
                "Fred Bloggs", "Joe Smith"
            ]);
        });

        it('returns an empty array if no data', () => {
            expect(new Rota([]).allStaff()).to.be.empty;
        });
    });

    describe('filtering by assignee', () => {
        it('returns events assigned to one person', () => {
            const rota = new Rota([
                {id: 1, assignees: ["Fred Bloggs"]},
                {id: 2, assignees: ["Fred Bloggs"]},
                {id: 3, assignees: ["Joe Smith"]},
            ] as CalendarEntry[]);

            expect(rota.byAssignee(['Fred Bloggs']).map(val => val.id))
                .to.eql([1, 2]);
        });

        it('returns events assigned to several people', () => {
            const rota = new Rota([
                {id: 1, assignees: ["Fred Bloggs"]},
                {id: 2, assignees: ["Dave Taylor"]},
                {id: 3, assignees: ["Joe Smith"]},
            ] as CalendarEntry[]);

            expect(rota.byAssignee(['Dave Taylor', 'Joe Smith']).map(val => val.id))
                .to.eql([2, 3]);
        });
    });
});

const EXAMPLE_CALENDAR_DATA = [
    {
        id: 1,
        assignees: ['OneAndTwo', 'OneOnly'],
        start: new Date('2020-05-09 08:00:00'),
        end: new Date('2020-05-09 15:00:00'),
        title: 'Morning Shift',
        desc: 'My awesome morning shift'
    },
    {
        id: 2,
        assignees: ['OneAndTwo', 'TwoAndThree'],
        start: new Date('2020-05-09 08:00:00'),
        end: new Date('2020-05-09 15:00:00'),
        title: 'Morning Shift',
        desc: 'My awesome morning shift'
    },
    {
        id: 3,
        assignees: ['TwoAndThree', 'ThreeOnly'],
        start: new Date('2020-05-09 08:00:00'),
        end: new Date('2020-05-09 15:00:00'),
        title: 'Morning Shift',
        desc: 'My awesome morning shift'
    }
];
