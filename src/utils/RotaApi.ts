import { Rota } from "./Rota";
import { PARSE_ENDPOINT } from "../environment";

export interface Activity {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  };
}

export class RotaApi {
  constructor(private fetcher: any = actualFetch) {}

  async fetchRota(file: File): Promise<Rota> {
    const form = new FormData();
    form.append("file", file);
    const parsed = JSON.parse(await this.fetcher(form).text());
    return this.mapRotaToCalendarData(parsed.rota);
  }

  private mapRotaToCalendarData(activities: Activity[]): Rota {
    return new Rota(
      activities.map(({ name, assignees, time }, index) => {
        return {
          allDay: false,
          assignees,
          desc: name,
          end: new Date(time.end),
          start: new Date(time.start),
          id: index,
          title: name,
        };
      })
    );
  }
}

export const actualFetch = async (formWithFile: any): Promise<Response> => {
  return await fetch(PARSE_ENDPOINT, {
    method: "POST",
    mode: "cors",
    redirect: "error",
    body: formWithFile,
    headers: {
      Accept: "application/json",
    },
  });
};
