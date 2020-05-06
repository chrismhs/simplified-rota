import React, {Component} from "react";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import {CalendarEntries} from "../../utils/RotaApi";
import {getAllMembers} from "../../utils/CalendarUtils";

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Container = styled.div`
  font-size: 0.875rem;
`;

const myEventsList = [
    {
        id: 0,
        title: "All Day",
        allDay: false,
        start: new Date(2020, 4, 0, 1, 0, 0),
        end: new Date(2020, 4, 0, 11, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting",
    },
];

type CalendarProps = {
       calendarData: CalendarEntries
}

class CalendarComponent extends Component<CalendarProps, { selected: string[] }> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            selected: getAllMembers(this.props.calendarData)
        };
    }

    handleFilterChange(e: React.FormEvent<HTMLInputElement>) {
        const {value, checked} = e.currentTarget;

        if(checked) {
            this.setState({selected: [...this.state.selected, value] });
        } else {
            this.setState({selected: this.state.selected.filter(currentVal => currentVal !== value) });
        }
    }

    render() {
        const names = getAllMembers(this.props.calendarData);

        return (
            <Container>
                {names.map(name => {
                    return <label><input value={name} type='checkbox' onChange={this.handleFilterChange.bind(this)}/>{name}</label>
                })}
                <Calendar
                    localizer={localizer}
                    events={this.props.calendarData}
                    startAccessor="start"
                    endAccessor="end"
                    // @ts-ignore (any ideas?)
                    style={{height: 600}}
                    views={["month", "week", "agenda"]}
                />
            </Container>
        );
    }
}

export default CalendarComponent;
