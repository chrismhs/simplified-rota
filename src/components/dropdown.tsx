import React from "react";
import Select from "react-select";

type DropdownMultiSelectProps = {
    names: string[];
};

class DropdownMultiSelect extends React.Component<DropdownMultiSelectProps> {
    private readonly options: { value: string, label: string }[];

    constructor(props: DropdownMultiSelectProps) {
        super(props);
        this.options = this.props.names.map(name => ({ value: name, label: name }));
    }

    render() {
        return (
            <Select
                isMulti
                defaultValue={[]}
                name="Assignees"
                options={this.options}
                className="names-select"
                classNamePrefix="select"
                onChange={console.log}
            />
        )
    }
}

export default DropdownMultiSelect;
