import React, { Component } from "react";
import PropTypes from "prop-types";

import styled, { withTheme } from "styled-components";

const Container = styled.div`
  margin-bottom: 32px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const InputStyle = styled.input`
  padding: 12px;
  background-color: rgba(${(props) => props.theme.light.text}, 0.05);
  border: 0;
  border-bottom: 1px solid rgb(0, 0, 0);

  :focus {
    border: 1px solid ${(props) => props.theme.text};
  }
`;

export class Input extends Component {
  render() {
    return (
      <Container>
        <Description>{this.props.description}</Description>
        <InputStyle placeholder={this.props.placeholder} />
      </Container>
    );
  }
}

Input.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string,
};

export default withTheme(Input);
