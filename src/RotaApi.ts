export interface RotaLine {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  }
}

export const ROTA_API = process.env.ROTA_API || 'http://localhost:5000/parse';

export class RotaApi {
  constructor(private baseUrl: string = ROTA_API, private fetcher = window.fetch.bind(window)) {
  }

  async getRotaRows(file?: File): Promise<{ rotaRows: any, error?: string }> {
    try {
      const responseFromApi = await this.fetcher(`${this.baseUrl}/responses`, {
        mode: "cors",
        method: "POST",

      });
      const body = await responseFromApi.text();
      const parsed = JSON.parse(body);
      return {rotaRows: parsed.timetable || [], error: parsed.error}
    } catch (e) {
      return {rotaRows: [], error: e.message}
    }
  }
}

export const rotaApi = new RotaApi();
