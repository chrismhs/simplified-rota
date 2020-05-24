import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {RotaApi} from "../utils/RotaApi";
import App from "../components/app";


const Index: React.FunctionComponent<{api?: RotaApi}> = ({ api = new RotaApi()}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <App api={new RotaApi()} />
    </Layout>
  );
};

export default Index;
