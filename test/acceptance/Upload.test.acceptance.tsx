import Index from "../../src/pages";
import React from "react";
import {mount} from "enzyme";
import {RotaApi} from "../../src/utils/RotaApi";
import { expect } from "chai";
import {Calendar} from "react-big-calendar";
import App from "../../src/components/app";
import {SelectFile} from "../../src/components/selectFile";
import {CalendarEntry} from "../../src/utils/Rota";

// describe("Upload File", () => {
//
//   before(() => {
//     // @ts-ignore
//     global.__PATH_PREFIX__ = '';
//   });
//
//   it("processes an upload and shows a screen with schedule in a calendar", () => {
//     const stubApi = new RotaApiStub(EXAMPLE_CALENDAR_DATA);
//     const app = mount(<App api={stubApi} omitLink={true} />);
//
//     const reactWrapper = app.find(SelectFile);
//     reactWrapper.simulate('click');
//
//     expect(app.find(Calendar)).to.exist;
//   });
// });
//
// class RotaApiStub extends RotaApi {
//   constructor(private cannedData: CalendarEntry[]) {
//     super();
//   }
//
//   async getCalendarData(
//     file: File
//   ): Promise<{ calendarData: CalendarEntry[]; error?: string }> {
//     return { calendarData: this.cannedData };
//   }
// }

const EXAMPLE_CALENDAR_DATA: CalendarEntry[] = [
  {
    id: 1,
    assignees: ["OneAndTwo", "OneOnly"],
    start: new Date("2020-05-09 08:00:00"),
    end: new Date("2020-05-09 15:00:00"),
    title: "Morning Shift",
    desc: "My awesome morning shift",
  },
  {
    id: 2,
    assignees: ["OneAndTwo", "TwoAndThree"],
    start: new Date("2020-05-09 08:00:00"),
    end: new Date("2020-05-09 15:00:00"),
    title: "Morning Shift",
    desc: "My awesome morning shift",
  },
  {
    id: 3,
    assignees: ["TwoAndThree", "ThreeOnly"],
    start: new Date("2020-05-09 08:00:00"),
    end: new Date("2020-05-09 15:00:00"),
    title: "Morning Shift",
    desc: "My awesome morning shift",
  },
];
