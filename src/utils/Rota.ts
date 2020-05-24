export type CalendarEntry = {
  assignees: string[];
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  desc?: string;
};

export class Rota {
  constructor(private readonly entries: CalendarEntry[]) {}

  allStaff(): string[] {
    return [...new Set(flatMap(this.entries, (entry) => entry.assignees))];
  }

  byAssignee(names: string[]): CalendarEntry[] {
    return this.entries.filter((e) =>
      e.assignees.some((a) => names.includes(a))
    );
  }

  all(): CalendarEntry[] {
    return [...this.entries];
  }
}

function flatMap<T, U>(arr: T[], cb: (t: T) => U[]): U[] {
  return arr.map(cb).reduce((prev, cur) => prev.concat(cur), []);
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
