import stubbedData from "../../sample";
import React, {Fragment} from "react";
import styled from "styled-components";

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
        // For when we actually send data to back end
        // const data = new FormData();
        // data.append('file', e.target.files[0]);
        //
        // const res = await fetch('http://127.0.0.1:5000/parse', {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   body: data
        // });

        const data = stubbedData;
        console.log(data);
    };
    return (
        <Fragment>
            <SubmitButton onClick={() => document.getElementById('myfile').click()}>Upload from your
                computer</SubmitButton>
            <FileInput type="file" id="myfile" name="myfile" onChange={onChangeHandler}/>
        </Fragment>
    )
};
