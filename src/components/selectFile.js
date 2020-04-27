import React, {Fragment} from "react";
import styled from "styled-components";
import {PARSE_ENDPOINT} from "../environment";


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
export const SelectFile = () => {
    const onChangeHandler = async (e) => {
        const file = e.target.files[0];
        const form = new FormData();
        form.append('file', file);
        const response = await fetch(PARSE_ENDPOINT, {
            method: "POST",
            mode: "cors",
            redirect: "error",
            body: form,
            headers: {
                "Accept": "application/json"
            }
        });
        const rotaData = await response.json();
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('rotaData', JSON.stringify(rotaData));
        } else {
            console.warn("localStorage not available");
        }
    };
    return (
        <Fragment>
            <SubmitButton onClick={() => document.getElementById('myfile').click()}>Upload from your
                computer</SubmitButton>
            <FileInput type="file" id="myfile" name="myfile" onChange={onChangeHandler}/>
        </Fragment>
    )
};
