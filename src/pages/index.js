import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Taking some of the stress out of healthcare rotas</h1>
    <p>
      A tool that helps healthcare workers get a simple version of their work
      schedule. Knowing when you are working should be easy.
    </p>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
