import {mount, ReactWrapper} from "enzyme";
import CalendarComponent from "./calendar";
import React from 'react';
import {expect} from "chai";
import {Calendar} from "react-big-calendar";
import Select from "react-select/base";

describe('Calendar Component', () => {
    describe('Name Filter', () => {
        it('renders no events if nothing is selected', () => {
            const wrapper = mount(<CalendarComponent calendarData={EXAMPLE_CALENDAR_DATA} initialNameSelection={[]}/>);
            expect(wrapper.find(Calendar).prop('events')).to.have.length(0);
        });

        xit('filters events to only those containing the selected assignee', () => {
            const wrapper = mount(<CalendarComponent calendarData={EXAMPLE_CALENDAR_DATA}/>);

            addNameToFilter(wrapper, 'OneOnly');

            const eventIds = wrapper.find(Calendar)
                .prop('events')
                .map((e: any) => e.id);
            expect(eventIds).to.eql([1]);
        });

        xit('can filter more than one at once', () => {
            const wrapper = mount(<CalendarComponent calendarData={EXAMPLE_CALENDAR_DATA}/>);

            addNameToFilter(wrapper, 'OneOnly');
            addNameToFilter(wrapper, 'ThreeOnly');

            const ids = wrapper.find(Calendar)
                .prop('events')
                .map((e: any) => e.id);
            expect(ids).to.eql([1, 3]);
        });

        xit('correctly filters names appearing in multiple events', () => {
            const wrapper = mount(<CalendarComponent calendarData={EXAMPLE_CALENDAR_DATA}/>);

            addNameToFilter(wrapper, 'OneAndTwo');

            const ids = wrapper.find(Calendar)
                .prop('events')
                .map((e: any) => e.id);
            expect(ids).to.eql([1, 2]);
        });
    });
});

function addNameToFilter(wrapper: ReactWrapper<any, any, React.Component>, name: string) {
    // TODO
    wrapper.find(Select).props().selectOption(name);
}

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
