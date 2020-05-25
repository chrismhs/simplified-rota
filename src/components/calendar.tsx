import React, {Component} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import {Rota} from "../utils/Rota";
import {NameFilter} from "./nameFilter";
import styled from "styled-components";

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const CalendarContainer = styled.div`
  font-size: 0.875rem;
`;

class CalendarComponent extends Component<
  { rota: Rota },
  { filter: string[] }
> {
  constructor(props: { rota: Rota }) {
    super(props);

    this.state = {
      filter: this.props.rota.allStaff(),
    };
  }

  private updateFilter = (newSelection: string[]) => {
    if (newSelection.length > 0) {
      this.setState({ filter: newSelection });
    } else {
      this.setState({ filter: this.props.rota.allStaff() });
    }
  };

  render() {
    const allStaff = this.props.rota.allStaff();
    const selectedStaff =
      this.state.filter.length === allStaff.length ? [] : allStaff;

    const events = this.props.rota.byAssignee(this.state.filter);
    return (
      <CalendarContainer>
        <NameFilter
          names={allStaff}
          updateFilter={this.updateFilter}
          selection={selectedStaff}
        />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          // @ts-ignore (help)
          style={{ height: 600 }}
          views={["month", "week", "agenda"]}
        />
      </CalendarContainer>
    );
  }
}

export default CalendarComponent;
