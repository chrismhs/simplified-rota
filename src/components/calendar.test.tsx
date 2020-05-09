import {mount} from "enzyme";
import CalendarComponent from "./calendar";
import React from 'react';
import {Calendar} from "react-big-calendar";
import { expect } from "chai";

describe('Calendar', () => {
    it('does stuff', () => {
        const data = [
            {
                id: 1,
                assignees: ['Joe Bloggs', 'Fred Durst'],
                start: new Date('2020-05-09 08:00:00'),
                end: new Date('2020-05-09 15:00:00'),
                title: 'Morning Shift',
                desc: 'My awesome morning shift'
            }
        ];
        const wrapper = mount(<CalendarComponent calendarData={data}/>);
        expect(wrapper.find(Calendar)).to.exist;
    });
});
