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

type Fetcher = (formWithFile: any) => Promise<any>;

export class RotaApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RotaApi {
  constructor(private fetcher: Fetcher = actualFetch) {}

  async fetchRota(file: File): Promise<Rota> {
    const form = new FormData();
    form.append("file", file);
    const response = await this.fetcher(form);
    if (response.status !== 200) {
      const { error } = getErrorTextIfPossible(await response.text());
      if (error) throw new RotaApiError(error);
      throw new Error('Unknown error');
    }
    const obj = await response.json();
    return this.mapRotaToCalendarData(obj);
  }

  private mapRotaToCalendarData(obj: any): Rota {
    try {
      const {rota: activities} = obj;
      return new Rota(
        (activities as Activity[]).map(({name, assignees, time}, index) => {
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
    } catch (e) {
      throw new RotaApiError(`API returned data in unrecognised format: ${e.message}`);
    }
  }
}

const actualFetch = async (formWithFile: any): Promise<Response> => {
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

function getErrorTextIfPossible(body: string) {
  try {
    return JSON.parse(body);
  } catch (e) {
    return {};
  }
}
