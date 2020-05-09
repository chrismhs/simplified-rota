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


type CalendarProps = {
    calendarData: CalendarEntries
}

type OnFilterChange = (details: { value: string, checked: boolean }) => void;

type NameFilterProps = {
    names: string[];
    onFilterChange: OnFilterChange;
};

class NameFilter extends Component<NameFilterProps> {
    constructor(props: NameFilterProps) {
        super(props);
    }

    render() {
        let key = 0;
        return (
            <div>
                {this.props.names.map(n => this.renderName(n, key++))}
            </div>
        );
    }

    private renderName(name: string, key: number) {
        return (
            <label key={key}>
                <input value={name} type='checkbox' onChange={this.onChange.bind(this)}/>
                {name}
            </label>
        );
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        console.log({ e });
        const {value, checked} = e.currentTarget;
        this.props.onFilterChange({value, checked});
    }
}

class CalendarComponent extends Component<CalendarProps, { selected: string[] }> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            selected: getAllMembers(this.props.calendarData)
        };
    }

    handleFilterChange: OnFilterChange = ({ value, checked }) => {
        console.log({ value, checked });
        if (checked) {
            this.setState({selected: [...this.state.selected, value]});
        } else {
            this.setState({selected: this.state.selected.filter(currentVal => currentVal !== value)});
        }
    };

    render() {
        const names = getAllMembers(this.props.calendarData);

        return (
            <Container>
                <NameFilter names={names} onFilterChange={this.handleFilterChange.bind(this)} />
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
