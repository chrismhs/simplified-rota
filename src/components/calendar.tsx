import React, {Component} from "react";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import {CalendarEntries} from "../../utils/RotaApi";
import {getAllMembers} from "../../utils/CalendarUtils";
import DropdownComponent from "./dropdown";

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Container = styled.div`
  font-size: 0.875rem;
`;


type CalendarProps = {
    calendarData: CalendarEntries;
    initialNameSelection?: string[];
}

type OnFilterChange = (details: { value: string, checked: boolean }) => void;

export type NameFilterProps = {
    names: string[];
    updateFilter: OnFilterChange;
};

class NameFilter extends Component<NameFilterProps> {
    constructor(props: NameFilterProps) {
        super(props);
    }

    render() {
        let key = 0;
        return (
            <div className='name-filter'>
                {this.props.names.map(n => this.renderName(n, key++))}
            </div>
        );
    }

    private renderName(name: string, key: number) {
        return (
            <label key={key}>
                <input className='name-filter__name' value={name} type='checkbox' onChange={this.onChange.bind(this)}/>
                {name}
            </label>
        );
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        const {value, checked} = e.currentTarget;
        this.props.updateFilter({value, checked});
    }
}

class CalendarComponent extends Component<CalendarProps, { selected: string[] }> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            selected: this.props.initialNameSelection || []
        };
    }

    updateFilter: OnFilterChange = ({value, checked}) => {
        const selected = checked
            ? this.state.selected.concat(value)
            : this.state.selected.filter(currentVal => currentVal !== value);

        this.setState({selected});
    };

    render() {
        const names = getAllMembers(this.props.calendarData);
        const selection = this.state.selected;

        const events = this.props.calendarData
            .filter(entry => entry.assignees.some(assignee => selection.includes(assignee)));

        return (
            <Container>
                <NameFilter names={names} updateFilter={this.updateFilter.bind(this)}/>
                {/*<DropdownComponent names={names} updateFilter={this.updateFilter.bind(this)} />*/}
                <Calendar
                    localizer={localizer}
                    events={events}
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
