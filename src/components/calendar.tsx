import React, {Component} from "react";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import {CalendarEntries} from "../../utils/RotaApi";
import {getAllMembers} from "../../utils/CalendarUtils";
import Select, {OptionsType} from "react-select";
import {ActionMeta, ValueType} from "react-select/src/types";

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Container = styled.div`
  font-size: 0.875rem;
`;

const NameFilterContainer = styled.div`
  width: max(300px, 50%);
  padding-bottom: 30px;
`;

type CalendarProps = {
    calendarData: CalendarEntries;
    initialNameSelection?: string[];
}

type OnFilterChange = (newSelection: string[]) => void;

type NameFilterProps = {
    names: string[];
    selection: string[];
    updateFilter: OnFilterChange;
};

type NameFilterOption = {
    value: string;
    label: string;
}

class NameFilter extends Component<NameFilterProps> {
    private readonly options: OptionsType<NameFilterOption>;
    private readonly initialSelection: OptionsType<NameFilterOption>;

    constructor(props: NameFilterProps) {
        super(props);
        this.options = this.props.names.map(name => ({ value: name, label: name }));
        this.initialSelection = this.props.selection.map(name => ({value: name, label: name}));
    }

    render() {
        return (
            <NameFilterContainer>
            <Select
                isMulti
                placeholder="Select a name to filter"
                defaultValue={this.initialSelection}
                name="Assignees"
                options={this.options}
                className="names-select"
                classNamePrefix="select"
                onChange={this.onChange.bind(this)}
            />
            </NameFilterContainer>
        )
    }

    private onChange(newSelection: ValueType<NameFilterOption>, actionMeta: ActionMeta<NameFilterOption>) {
        const valuesWithoutTypeNonsense = ((newSelection || []) as NameFilterOption[]).map(sel => sel.value);
        this.props.updateFilter(valuesWithoutTypeNonsense);
    }
}

class CalendarComponent extends Component<CalendarProps, { selected: string[] }> {
    constructor(props: CalendarProps) {
        super(props);

        this.state = {
            selected: this.props?.initialNameSelection || []
        };
    }
    render() {
        const names = getAllMembers(this.props.calendarData);
        const selection = this.state.selected?.length
            ? this.state.selected
            : getAllMembers(this.props.calendarData);

        const events = this.props.calendarData
            .filter(entry => entry.assignees.some(assignee => selection.includes(assignee)));
        return (
            <Container>
                <NameFilter
                    names={names}
                    updateFilter={(newSelection: string[]) => this.setState({selected: newSelection})}
                    selection={selection}
                />
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    // @ts-ignore (help)
                    style={{height: 600}}
                    views={["month", "week", "agenda"]}
                />
            </Container>
        );
    }
}

export default CalendarComponent;
