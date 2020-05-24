import React, {Component} from "react";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import Select, {OptionsType} from "react-select";
import {ActionMeta, ValueType} from "react-select/src/types";
import {Rota} from "../utils/Rota";

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Container = styled.div`
  font-size: 0.875rem;
`;

const NameFilterContainer = styled.div`
  width: max(300px, 50%);
  padding-bottom: 30px;
`;

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
        this.options = this.props.names.map(name => ({value: name, label: name}));
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

class CalendarComponent extends Component<{ rota: Rota }, { filter: string[] }> {

    constructor(props: { rota: Rota }) {
        super(props);

        this.state = {
            filter: this.props.rota.allStaff()
        };
    }

    private updateFilter = (newSelection: string[]) => {
        if (newSelection.length > 0) {
            this.setState({filter: newSelection});
        } else {
            this.setState({filter: this.props.rota.allStaff()});
        }
    };

    render() {
        const allStaff = this.props.rota.allStaff();
        const selectedStaff =
            this.state.filter.length === allStaff.length
                ? []
                : allStaff;

        const events = this.props.rota.byAssignee(this.state.filter);
        return (
            <Container>
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
                    style={{height: 600}}
                    views={["month", "week", "agenda"]}
                />
            </Container>
        );
    }
}

export default CalendarComponent;
