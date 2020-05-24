import { mount, ReactWrapper } from "enzyme";
import CalendarComponent from "../../src/components/calendar";
import React from "react";
import { expect } from "chai";
import { Calendar } from "react-big-calendar";
import Select from "react-select/base";
import { Rota } from "../../src/utils/Rota";

describe("Calendar Component", () => {
  describe("Name Filter", () => {
    it("renders all events if nothing is selected", () => {
      const wrapper = mount(<CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />);
      expect(getEventIds(wrapper)).to.eql([1, 2, 3]);
    });

    it("initially puts nothing in the name filter", () => {
      const wrapper = mount(<CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />);
      expect(wrapper.find("NameFilter").prop("selection")).to.be.empty;
    });

    it("filters events to only those containing the selected assignee", () => {
      const wrapper = mount(<CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />);
      setNameFilter(wrapper, ["OneOnly"]);
      expect(getEventIds(wrapper)).to.eql([1]);
    });

    it("can filter more than one at once", () => {
      const wrapper = mount(<CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />);
      setNameFilter(wrapper, ["OneOnly", "ThreeOnly"]);
      expect(getEventIds(wrapper)).to.eql([1, 3]);
    });

    it("correctly filters names appearing in multiple events", () => {
      const wrapper = mount(<CalendarComponent rota={EXAMPLE_CALENDAR_DATA} />);
      setNameFilter(wrapper, ["OneAndTwo"]);
      expect(getEventIds(wrapper)).to.eql([1, 2]);
    });
  });
});

function setNameFilter(filter: ReactWrapper, values: string[]) {
  const onFilterChange = filter.find(Select).prop("onChange");
  const filterValues = values.map((val) => ({ value: val, label: val }));
  onFilterChange(filterValues);
  filter.update();
}

function getEventIds(wrapper: ReactWrapper) {
  return wrapper
    .find(Calendar)
    .prop("events")
    .map((e: any) => e.id);
}

const EXAMPLE_CALENDAR_DATA = new Rota([
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
]);
