import React, {Component} from "react";
import {NameFilterProps} from "./calendar";

import Dropdown from "react-bootstrap/Dropdown";

class DropdownComponent extends Component<any> {
    constructor(props: NameFilterProps) {
        super(props);
    }

    render() {
        let key = 0;
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select your name
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.props.names.map((n: string) => (
                        <Dropdown.Item href={`#${key}`}>
                            {n}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        const {value, checked} = e.currentTarget;
        this.props.updateFilter({value, checked});
    }
}


export default DropdownComponent;
