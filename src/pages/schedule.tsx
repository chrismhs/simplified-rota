import React from "react";
import {Link} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CalendarComponent from "../components/calendar";
import ErrorPage from "../components/errorPage";
import {CalendarEntries} from "../../utils/RotaApi";

function retrieveCalendarData(): CalendarEntries | null {
    try {
        return JSON.parse(atob(sessionStorage.getItem("simplerotas")!!));
    } catch (e) {
        return null;
    }
}

const Schedule: React.FunctionComponent = () => {
    const calendarData = retrieveCalendarData();
    if (!calendarData) {
        return <ErrorPage/>;
    }

    return (
        <Layout>
            <SEO title="Schedule"/>
            <h2>Your schedule</h2>
            <CalendarComponent calendarData={calendarData}/>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
};

export default Schedule;
