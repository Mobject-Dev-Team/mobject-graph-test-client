// loadGraph.test.js

const { AdsRpcClient } = require("mobject-client");

describe("LoadGraph RPC Call", () => {
  let client;

  beforeAll(async () => {
    client = new AdsRpcClient("127.0.0.1.1.1", 851, "Main.server");
    await client.connect();
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test("LoadGraph with a missing node", async () => {
    expect.assertions(1);

    const sendData = {
      graph: {
        nodes: [
          {
            id: "2",
            type: "PLC Basic/Display/BOOL",
            mode: 0,
            inputs: [
              {
                name: "in",
                type: "BOOL",
              },
            ],
            title: "Display_BOOL",
          },
        ],
        uuid: "8506b771-8bd4-4160-984e-e0e4aa529fec",
      },
    };

    await expect(client.rpcCall("LoadGraph", sendData)).rejects.toThrow(
      "Deserialization Failed, Missing Key : order"
    );
  });
});