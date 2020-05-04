import React, {useState} from "react";
import {Link} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CalendarComponent from "../components/calendar";
import {SelectFile} from "../components/selectFile";

const Schedule = ({ calendarData, updateCalendarData }) => {
    return (
        <Layout>
            <SEO title="Schedule"/>
            <h2>Your schedule</h2>
            {/*<SelectFile updateCalendarData={updateCalendarData}/>*/}
            <CalendarComponent calendarData={calendarData}/>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
};

export default Schedule;
