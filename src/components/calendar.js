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
  }
  render() {
    return (
      <Container>
        <input value={'hey'} type='checkbox'/>
        <Calendar
            localizer={localizer}
            events={this.props.calendarData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "agenda"]}
        />
      </Container>
    );
  }
}

export default CalendarComponent;
