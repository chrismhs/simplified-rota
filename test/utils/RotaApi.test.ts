import {RotaApi, RotaApiError} from "../../src/utils/RotaApi";
import chai, { expect } from "chai";
import { Rota } from "../../src/utils/Rota";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("Rota Api", () => {
  it("fetches a rota", async () => {
    const mockApiResponse = {
      status: 200,
      text: () =>
        JSON.stringify({
          rota: [
            {
              name: "Morning Shift",
              assignees: ["Fred Bloggs"],
              time: {
                start: new Date("2020-01-01 09:00:00"),
                end: new Date("2020-01-01 13:00:00"),
              },
            },
          ],
        }),
    };

    const api = new RotaApi(() => Promise.resolve(mockApiResponse));

    expect(await api.fetchRota({} as File)).to.eql(
      new Rota([
        {
          assignees: ["Fred Bloggs"],
          id: 0,
          title: "Morning Shift",
          desc: "Morning Shift",
          allDay: false,
          start: new Date("2020-01-01 09:00:00"),
          end: new Date("2020-01-01 13:00:00"),
        },
      ])
    );
  });

  it("throws on unspecified error", async () => {
    const api = new RotaApi(() => {
      throw new Error("something terrible happened");
    });
    await expect(api.fetchRota({} as File)).to.be.rejectedWith(
      "something terrible happened"
    );
  });

  it('throws custom error on non-2xx status code preserving error text', async () => {
    const api = new RotaApi(async () => ({
      status: 500,
      text: () => JSON.stringify({error: 'API fell over'})
    }));
    await expect(api.fetchRota({} as File))
      .to.be.rejectedWith(RotaApiError, 'API fell over');
  });

  it('supplies canned message if no error text was available', async () => {
    const api = new RotaApi(async () => ({
      status: 500,
      text: () => ''
    }));
    await expect(api.fetchRota({} as File))
      .to.be.rejectedWith(/unknown/i);
  });
});
