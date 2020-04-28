import React, {Fragment} from "react";
import styled from "styled-components";
import {RotaApi} from "./RotaApi";

const SubmitButton = styled.button`
  display: flex;
  padding: 11px 16px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FileInput = styled.input`
  display: none;
`;
export const SelectFile = ({updateCalendarData}) => {
    const onChangeHandler = async (e) => {
        const file = e.target.files[0];
        const response = await new RotaApi().getCalendarData(file);
        if (!response.error) {
            updateCalendarData(response.calendarData)
        }
    };
    return (
        <Fragment>
            <SubmitButton onClick={() => document.getElementById('myfile').click()}>Upload your rota</SubmitButton>
            {/*todo check file types*/}
            <FileInput type="file" id="myfile" name="myfile" accept=".xlsx" onChange={onChangeHandler}/>
        </Fragment>
    )
};
