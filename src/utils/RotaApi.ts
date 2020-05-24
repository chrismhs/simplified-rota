import {Rota} from "./Rota";

export interface Activity {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  };
}

export type CalendarEntry = {
  assignees: string[];
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  desc?: string;
};

export const ROTA_API = process.env.ROTA_API || "http://localhost:5000";

export class RotaApi {
  constructor(private fetcher: any = actualFetch) {}

  async fetchRota(
    file: File
  ): Promise<Rota> {
    try {
      const form = new FormData();
      form.append("file", file);
      const parsed = JSON.parse(await this.fetcher(form).text());
      return this.mapRotaToCalendarData(parsed.rota);
    } catch (e) {
      return new Rota([]);
    }
  }

  private mapRotaToCalendarData(activities: Activity[]): Rota {
    return new Rota(activities.map(({ name, assignees, time }, index) => {
      return {
        allDay: false,
        assignees,
        desc: name,
        end: new Date(time.end),
        start: new Date(time.start),
        id: index,
        title: name,
      };
    }));
  }
}

export const actualFetch = async (formWithFile: any): Promise<Response> => {
  return await fetch(`${ROTA_API}/parse`, {
    method: "POST",
    mode: "cors",
    redirect: "error",
    body: formWithFile,
    headers: {
      Accept: "application/json",
    },
  });
};
