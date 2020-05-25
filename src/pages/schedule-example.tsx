import React from "react";
import CalendarComponent from "../components/calendar";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { ThreeQuartersWidth } from "../layout/containers";
import { Rota } from "../utils/Rota";
import {Spacer} from "../components/app";
import {Link} from "gatsby";

const EXAMPLE_CALENDAR_DATA = new Rota([
  {
    id: 1,
    assignees: ["Joe Bloggs", "Fred Durst"],
    start: new Date("2020-05-09 08:00:00"),
    end: new Date("2020-05-09 15:00:00"),
    title: "Morning Shift",
    desc: "My awesome morning shift",
  },
  {
    id: 2,
    title: "Evening Shift",
    start: new Date("2020-05-09 16:00:00"),
    end: new Date("2020-05-09 23:00:00"),
    assignees: ["Joe Bloggs", "David Davies"],
    desc: "My awesome morning shift",
  },
]);

const ScheduleExample: React.FunctionComponent = () => (
  <Layout>
    <SEO title="Example Schedule" />
    <ThreeQuartersWidth>
      <h1>Example Schedule</h1>
      <CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />
      <Spacer />
      <Link to="/">Go back to the homepage</Link>
    </ThreeQuartersWidth>
  </Layout>
);

export default ScheduleExample;
