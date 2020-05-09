import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {TwoThirdsWidth} from "../layout/containers";
import Input from "../components/inputs";

const Setup = () => (
  <Layout>
    <SEO title="Setup" />
    <TwoThirdsWidth>
      <h2>Let's read the data</h2>
      <p>
        To help us understand the schedule, let me know where certain bits of
        information are. Don’t worry about gaps or dividing cells, we’ll figure
        it out.
      </p>
      <Input
        description="Which range are the dates in?"
        placeholder="E.g. A1:C14"
      />
      <Input
        description="Which range are the dates in?"
        placeholder="E.g. A1:C14"
      />
      <Input
        description="Which range are the dates in?"
        placeholder="E.g. A1:C14"
      />
      <Link to="/">Go back to the homepage</Link>
      <br />
      <Link to="/schedule">Calendar page</Link>
    </TwoThirdsWidth>
  </Layout>
);

export default Setup;
