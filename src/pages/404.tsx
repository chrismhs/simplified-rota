import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {Link} from "gatsby";
import {Spacer} from "../components/app";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Spacer />
    <Link to="/">Go back to the homepage</Link>

  </Layout>
);

export default NotFoundPage;
