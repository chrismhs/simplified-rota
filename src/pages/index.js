import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import TwoThirdsWidth from "../layout/containers";

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

const Spacer = styled.div`
  display: block;
  height: 50px;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TwoThirdsWidth>
      <h1>Taking some of the stress out of healthcare rotas</h1>
      <p>
        A tool that helps healthcare workers get a simple version of their work
        schedule. Knowing when you are working should be easy.
      </p>
      <SubmitButton>Upload from your computer</SubmitButton>

      <Link to="/setup/">Setup page</Link>
      <Spacer />
      <p>
        This is an open-source project. If you think you can help, get in touch
        or head over to the GitHub page.
      </p>
    </TwoThirdsWidth>
  </Layout>
);

export default IndexPage;
