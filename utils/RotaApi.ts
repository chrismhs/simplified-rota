export interface Activity {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  }
}

export type Rota = Activity[]

export type CalendarEntry = {
  assignees: string[],
  id: number,
  title: string,
  allDay?: boolean,
  start: Date,
  end: Date,
  desc?: string,
}

export type CalendarEntries = CalendarEntry[]

export const ROTA_API = process.env.ROTA_API || 'http://localhost:5000';

export class RotaApi {
  constructor(private fetcher: any = actualFetch) {}

  async getCalendarData(file: File): Promise<{ calendarData: CalendarEntries, error?: string }> {
    try {
      const form = new FormData();
      form.append('file', file);
      const responseFromApi = await this.fetcher(form);
      const body = await responseFromApi.text();
      const parsed = JSON.parse(body);
      const calendarData = this.mapRotaToCalendarData(parsed.rota);
      return {calendarData, error: parsed.error}
    } catch (e) {
      return {calendarData: [], error: e.message}
    }
  }

  private mapRotaToCalendarData(rota: Activity[]): CalendarEntry[] {
    return rota.map(({name, assignees, time}, index) => {
      return {
        allDay: false,
        assignees,
        desc: name,
        end: new Date(time.end),
        start: new Date(time.start),
        id: index,
        title: name
      }
    })
  }
}

export const actualFetch = async (formWithFile: any): Promise<Response> => {
  return await fetch(`${ROTA_API}/parse`, {
    method: "POST",
    mode: "cors",
    redirect: "error",
    body: formWithFile,
    headers: {
      "Accept": "application/json"
    }
  })
};
