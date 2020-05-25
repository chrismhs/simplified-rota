import React, {Fragment} from "react";
import styled from "styled-components";
import {RotaApi, RotaApiError} from "../utils/RotaApi";
import {OnUploadError, OnUploadSuccess} from "../utils/Types";

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
  onUploadSuccess: OnUploadSuccess;
  onUploadError: OnUploadError;
  rotaApi: RotaApi;
};

export const SelectFile: React.FunctionComponent<SelectFileProps> = ({ onUploadSuccess, onUploadError, rotaApi }) => {
  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file) {
      try {
        const rota = await rotaApi.fetchRota(file);
        onUploadSuccess(rota);
      } catch(e) {
        console.error("Failed to parse rota:", e);
        onUploadError(e instanceof RotaApiError ? e.message : "");
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
