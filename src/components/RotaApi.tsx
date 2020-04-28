export interface RotaLine {
  name: string;
  assignees: string[];
  time: {
    start: Date;
    end: Date;
  }
}

export const ROTA_API = process.env.ROTA_API || 'http://localhost:5000';

export class RotaApi {
  constructor(private fetcher: any = actualFetch) {}

  public async getRotaRows(formWithFile?: any): Promise<{ rotaRows: any, error?: string }> {
    try {
      const responseFromApi = await this.fetcher(formWithFile);
      const body = await responseFromApi.text();
      const parsed = JSON.parse(body);
      return {rotaRows: parsed.rota || [], error: parsed.error}
    } catch (e) {
      return {rotaRows: [], error: e.message}
    }
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
