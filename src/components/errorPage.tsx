import Layout from "./layout";
import SEO from "./seo";
import React from "react";
import { Link } from "gatsby";

const ErrorPage = () => (
  <Layout>
    <SEO title="Error" />
    <h1>Something went wrong</h1>
    <p>We had a problem and couldn't complete your request.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default ErrorPage;
