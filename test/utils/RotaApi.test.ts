import {RotaApi} from "../../src/utils/RotaApi";
import { expect } from "chai";
import {Rota} from "../../src/utils/Rota";

describe('Rota Api', () => {
  it('fetches a rota', async () => {
    const mockApiResponse = {
      text: () => JSON.stringify({
        rota: [
          {
            name: 'Morning Shift',
            assignees: ['Fred Bloggs'],
            time: {
              start: new Date('2020-01-01 09:00:00'),
              end: new Date('2020-01-01 13:00:00')
            }
          }
        ]
      })
    };

    const api = new RotaApi(() => mockApiResponse);

    expect(await api.fetchRota({} as File)).to.eql(new Rota([
      {
        assignees: ['Fred Bloggs'],
        id: 0,
        title: 'Morning Shift',
        desc: 'Morning Shift',
        allDay: false,
        start: new Date('2020-01-01 09:00:00'),
        end: new Date('2020-01-01 13:00:00')
      }
    ]));
  });
});
