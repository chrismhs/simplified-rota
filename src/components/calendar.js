import React, {Component} from "react";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";

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

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: CalendarComponent.getNames(this.props.calendarData)
        };
    }

    handleFilterChange(e) {
        const {value, checked} = e.currentTarget;

        if(checked) {
            this.setState({selected: [...this.state.selected, value] });
        } else {
            this.setState({selected: this.state.selected.filter(currentVal => currentVal !== value) });
        }
    }

    static getNames(data) {
        return data.map(calendarEntry => {
            return calendarEntry.assignees
        }).flat().reduce((prev, curr) => {
            if (!prev.includes(curr)) {
                prev.push(curr)
            }
            return prev
        }, []).sort();
    }

    render() {
        const names = CalendarComponent.getNames(this.props.calendarData);
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
                    style={{height: 600}}
                    views={["month", "week", "agenda"]}
                />
            </Container>
        );
    }


}

export default CalendarComponent;
