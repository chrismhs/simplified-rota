import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CalendarComponent from "../components/calendar";

const Schedule = () => (
  <Layout>
    <SEO title="Page two" />
    <h2>Your schedule</h2>
    <CalendarComponent />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default Schedule;
