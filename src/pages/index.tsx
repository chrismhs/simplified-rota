import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {RotaApi} from "../utils/RotaApi";
import App from "../components/app";
import ErrorPage from "../components/errorPage";

class Index extends React.Component<{}, { error?: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.state.error) {
      return <ErrorPage/>;
    }
    return (
      <Layout>
        <SEO title="Simple Rotas" />
        <App api={new RotaApi()} />
      </Layout>
    );
  }

  static getDerivedStateFromError(_: Error): {error?: boolean } {
    return {error: true};
  }
}

export default Index;
