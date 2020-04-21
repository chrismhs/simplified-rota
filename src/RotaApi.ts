export interface RotaLine {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  }
}

export class RotaApi {
  constructor(private baseUrl: string = '', private fetcher = window.fetch.bind(window)) {
  }

  async getRotaRows(): Promise<{ rotaRows: any, error?: string }> {
    try {
      const responseFromApi = await this.fetcher(`${this.baseUrl}/responses`);
      const body = await responseFromApi.text();
      const parsed = JSON.parse(body);
      return {rotaRows: parsed || [], error: parsed.error}
    } catch (e) {
      return {rotaRows: {}, error: e.message}
    }
  }
}
