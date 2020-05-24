import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CalendarComponent from "../components/calendar";
import ErrorPage from "../components/errorPage";
import { Rota } from "../utils/Rota";

function retrieveCalendarData(): Rota | null {
  try {
    const entries = JSON.parse(atob(sessionStorage.getItem("simplerotas")!!));
    return new Rota(entries);
  } catch (e) {
    return null;
  }
}

const Schedule: React.FunctionComponent = () => {
  const calendarData = retrieveCalendarData();
  if (!calendarData) {
    return <ErrorPage />;
  }

  return (
    <Layout>
      <SEO title="Schedule" />
      <h2>Your schedule</h2>
      <CalendarComponent rota={calendarData} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default Schedule;
