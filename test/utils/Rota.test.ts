import {CalendarEntry, Rota} from "../../src/utils/Rota";
import { expect } from "chai";

describe("Rota", () => {
  describe("getAllStaff", () => {
    it("gets all members from calendar events", () => {
      const rota = new Rota([
        { assignees: ["Fred Bloggs"] },
        { assignees: ["Joe Smith"] },
        { assignees: ["Jean Dupont"] },
      ] as CalendarEntry[]);

      expect(rota.allStaff().sort()).to.eql([
        "Fred Bloggs",
        "Jean Dupont",
        "Joe Smith",
      ]);
    });

    it("ignores duplicates", () => {
      const rota = new Rota([
        { assignees: ["Fred Bloggs"] },
        { assignees: ["Fred Bloggs"] },
        { assignees: ["Joe Smith"] },
      ] as CalendarEntry[]);

      expect(rota.allStaff().sort()).to.eql(["Fred Bloggs", "Joe Smith"]);
    });

    it("returns an empty array if no data", () => {
      expect(new Rota([]).allStaff()).to.be.empty;
    });
  });

  describe("filtering by assignee", () => {
    it("returns events assigned to one person", () => {
      const rota = new Rota([
        { id: 1, assignees: ["Fred Bloggs"] },
        { id: 2, assignees: ["Fred Bloggs"] },
        { id: 3, assignees: ["Joe Smith"] },
      ] as CalendarEntry[]);

      expect(rota.byAssignee(["Fred Bloggs"]).map((val) => val.id)).to.eql([
        1,
        2,
      ]);
    });

    it("returns events assigned to several people", () => {
      const rota = new Rota([
        { id: 1, assignees: ["Fred Bloggs"] },
        { id: 2, assignees: ["Dave Taylor"] },
        { id: 3, assignees: ["Joe Smith"] },
      ] as CalendarEntry[]);

      expect(
        rota.byAssignee(["Dave Taylor", "Joe Smith"]).map((val) => val.id)
      ).to.eql([2, 3]);
    });
  });
});
