import SEO from "./seo";
import { TwoThirdsWidth } from "../layout/containers";
import { SelectFile } from "./selectFile";
import {Link, navigate} from "gatsby";
import Layout from "./layout";
import React from "react";
import styled from "styled-components";
import { OnScheduleUploaded } from "../utils/Types";
import { RotaApi } from "../utils/RotaApi";

const Spacer = styled.div`
  display: block;
  height: 50px;
`;

const UploadWrapper = styled.div`
  display: flex;
`;

const LinkToExample = styled.div`
  margin: auto;
  margin-left: 20px;
  font-size: 0.9em;
`;

type AppProps = {
  api: RotaApi;
  omitLink?: boolean;
};

const App: React.FunctionComponent<AppProps> = ({ api, omitLink }) => {
  const onUpload: OnScheduleUploaded = async (schedule) => {
    sessionStorage.setItem("simplerotas", btoa(JSON.stringify(schedule)));
    await navigate("/schedule");
  };
  const linkToExample = omitLink
    ? <></>
    : <LinkToExample>or <Link to="/schedule-example">see an example</Link></LinkToExample>;

  return (
    <TwoThirdsWidth>
      <h1>Taking some of the stress out of healthcare rotas</h1>
      <p>
        A tool that helps healthcare workers get a simple version of their work
        schedule. Knowing when you are working should be easy.
      </p>
      <UploadWrapper>
        <SelectFile onRotaUploaded={onUpload} rotaApi={api}/>
        {linkToExample}
      </UploadWrapper>
      <Spacer/>
      <p>
        This is an open-source project. If you think you can help, get in touch
        or head over to the GitHub page.
      </p>
    </TwoThirdsWidth>
  );
};

export default App;
