import {CalendarEntries} from "./RotaApi";
import {getAllMembers} from "./CalendarUtils";
import chai, { expect } from "chai";

import deepEqualInAnyOrder from "deep-equal-in-any-order";

chai.use(deepEqualInAnyOrder);

describe('getAllMembers', () => {
    it('gets all members from calendar events', () => {
        const calendar = [
            { assignees: ["Fred Bloggs"] },
            { assignees: ["Joe Smith"] },
            { assignees: ["Jean Dupont"] },
        ] as CalendarEntries;

        expect(getAllMembers(calendar))
            .to.deep.equalInAnyOrder(["Joe Smith", "Fred Bloggs", "Jean Dupont"]);
    });

    it('ignores duplicates', () => {
        const calendar = [
            { assignees: ["Fred Bloggs"] },
            { assignees: ["Fred Bloggs"] },
            { assignees: ["Joe Smith"] },
        ] as CalendarEntries;

        expect(getAllMembers(calendar))
            .to.deep.equalInAnyOrder(["Fred Bloggs", "Joe Smith"]);
    });

});
