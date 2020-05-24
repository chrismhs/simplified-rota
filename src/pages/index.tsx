import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {RotaApi} from "../utils/RotaApi";
import App from "../components/app";


const Index: React.FunctionComponent = () => {
  return (
    <Layout>
      <SEO title="Simple Rotas" />
      <App api={new RotaApi()} />
    </Layout>
  );
};

export default Index;
