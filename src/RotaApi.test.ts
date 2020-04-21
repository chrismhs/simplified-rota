import {expect} from "chai";
import {Random} from "../utils/Random";
import {Dates} from "../utils/Dates";
import {RotaApi, RotaLine} from "./rotaApi";

function buildRotaLine(partial?: Partial<RotaLine>): RotaLine {
  let start = Random.date();
  return {
    name: Random.string('hospital'),
    assignees: [
      Random.string('name1'),
      Random.string('name2'),
      Random.string('name3'),
    ],
    time: {
      start,
      end: Dates.addHours(start, Random.integer(10))
    }
  }
}

function buildRandomRota(rows? :number): RotaLine[] {
  let i: number;
  const jsonRota = [];
  for (i = 0; i <= (rows || Random.integer(20)); i++) {
    jsonRota.push(buildRotaLine())
  }
  return jsonRota;
}

describe('RotaApi', () => {
  it('gets transformed data', async () => {
    const jsonRota = buildRandomRota();

    const workingFetch = async (_input: RequestInfo, _options?: RequestInit): Promise<Response> => {
      async function getText() {
        return JSON.stringify({timetable: jsonRota});
      }
      return {status: 200, text: getText} as Response;
    };
    const rotaApi = new RotaApi('', workingFetch);
    const rota = await rotaApi.getRotaRows();
    expect(rota.rotaRows.timetable.length).to.eql(jsonRota.length);
    expect(rota.rotaRows.timetable[0].name).to.eql(jsonRota[0].name);
    expect(rota.rotaRows.timetable[0].assignees).to.eql(jsonRota[0].assignees);
    //TODO: improve dates to deep equal in formatting
    // expect(rota.rotaRows).to.eql({timetable: jsonRota});
  });

});
