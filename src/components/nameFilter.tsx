import styled from "styled-components";
import React, {Component} from "react";
import Select, {OptionsType} from "react-select";
import {ActionMeta, ValueType} from "react-select/src/types";

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
};

export class NameFilter extends Component<NameFilterProps> {
  private readonly options: OptionsType<NameFilterOption>;
  private readonly initialSelection: OptionsType<NameFilterOption>;

  constructor(props: NameFilterProps) {
    super(props);
    this.options = this.props.names.map((name) => ({
      value: name,
      label: name,
    }));
    this.initialSelection = this.props.selection.map((name) => ({
      value: name,
      label: name,
    }));
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
          styles={{ menu: styles => ({ ...styles, zIndex: 5})}}
        />
      </NameFilterContainer>
    );
  }

  private onChange(
    newSelection: ValueType<NameFilterOption>,
    actionMeta: ActionMeta<NameFilterOption>
  ) {
    const valuesWithoutTypeNonsense = ((newSelection ||
      []) as NameFilterOption[]).map((sel) => sel.value);
    this.props.updateFilter(valuesWithoutTypeNonsense);
  }
}
