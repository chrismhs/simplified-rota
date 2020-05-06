import {CalendarEntries} from "./RotaApi";


export function getAllMembers(data: CalendarEntries): string[] {
    return unique(flatMap(data, entry => entry.assignees));
}

function flatMap<T, U>(arr: T[], cb: (t: T) => U[]): U[] {
    return arr.map(cb)
        .reduce((prev, cur) => prev.concat(cur), []);
}

function unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}
