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
  render() {
    if (typeof localStorage !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('rotaData'));
      console.log(data);
    } else {
      console.warn("Failed to retrieve rota data from localStorage");
    }
    return (
      <Container>
        <Calendar
          localizer={localizer}
          events={myEventsList}
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
