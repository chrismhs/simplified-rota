import React, { Fragment } from "react";
import styled from "styled-components";
import { RotaApi } from "../utils/RotaApi";
import { OnScheduleUploaded } from "../utils/Types";

const SubmitButton = styled.button`
  display: flex;
  padding: 11px 16px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
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

type SelectFileProps = {
  onRotaUploaded: OnScheduleUploaded;
  rotaApi: RotaApi;
};

export const SelectFile: React.FunctionComponent<SelectFileProps> = ({ onRotaUploaded, rotaApi }) => {
  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file) {
      const response = await rotaApi.getCalendarData(file);
      if (!response.error) {
        onRotaUploaded(response.calendarData);
      }
    }
  };
  return (
    <Fragment>
      <SubmitButton id="selectFile__submit" onClick={() => document.getElementById("myfile")?.click()}>
        Upload your rota
      </SubmitButton>
      {/*todo check file types*/}
      <FileInput
        type="file"
        id="myfile"
        name="myfile"
        accept=".xlsx"
        onChange={onChange}
      />
    </Fragment>
  );
};
