import React, {useState} from 'react';
import Schedule from "./schedule";
import Homepage from "./homepage";


const Index = () => {
    const [calendarData, setCalendarData] = useState(null);

    if (calendarData) {
        return (
            <Schedule calendarData={calendarData}/>
        )
    }
    return (
        <Homepage onRotaUploaded={setCalendarData}/>
    )
};

export default Index;
