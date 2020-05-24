import React from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import { SelectFile } from "../components/selectFile";
import SEO from "../components/seo";
import { TwoThirdsWidth } from "../layout/containers";
import { OnScheduleUploaded } from "../utils/Types";
import {RotaApi} from "../utils/RotaApi";

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

const Index: React.FunctionComponent<{api: RotaApi}> = ({ api = new RotaApi()}) => {
  const onUpload: OnScheduleUploaded = async (schedule) => {
    sessionStorage.setItem("simplerotas", btoa(JSON.stringify(schedule)));
    await navigate("/schedule");
  };
  return (
    <Layout>
      <SEO title="Home" />
      <TwoThirdsWidth>
        <h1>Taking some of the stress out of healthcare rotas</h1>
        <p>
          A tool that helps healthcare workers get a simple version of their
          work schedule. Knowing when you are working should be easy.
        </p>
        <UploadWrapper>
          <SelectFile onRotaUploaded={onUpload} />
          <LinkToExample>
            or <Link to="/schedule-example">see an example</Link>
          </LinkToExample>
        </UploadWrapper>
        <Spacer />
        <p>
          This is an open-source project. If you think you can help, get in
          touch or head over to the GitHub page.
        </p>
      </TwoThirdsWidth>
    </Layout>
  );
};

export default Index;
