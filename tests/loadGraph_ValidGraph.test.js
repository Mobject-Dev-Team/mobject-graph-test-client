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

  test("LoadGraph with valid nodes", async () => {
    const sendData = {
      graph: {
        nodes: [
          {
            id: "2",
            type: "PLC Basic/Display/BOOL",
            order: 1,
            mode: 0,
            inputs: [
              {
                name: "in",
                type: "BOOL",
              },
            ],
            title: "Display_BOOL",
          },
          {
            id: "1",
            type: "PLC Basic/Literals/BOOL",
            order: 0,
            mode: 0,
            outputs: [
              {
                name: "out",
                type: "BOOL",
              },
            ],
            title: "Literal_BOOL",
            properties: {
              value: true,
            },
          },
        ],
        links: [["1", "1", "out", "2", "in"]],
        uuid: "8506b771-8bd4-4160-984e-e0e4aa529fec",
      },
    };

    const expectedReply = {
      uuid: "8506b771-8bd4-4160-984e-e0e4aa529fec",
      alarms: [
        { message: "Node type is not installed", active: false },
        { message: "Deserialization failed", active: false },
      ],
      nodes: [
        {
          id: "1",
          order: 0,
          mode: 0,
          outputPorts: [
            { name: "out", datatype: { type: "BOOL" }, value: false },
          ],
          parameters: [
            { name: "value", datatype: { type: "BOOL" }, value: true },
          ],
          alarms: [{ message: "Deserialization failed", active: false }],
        },
        {
          id: "2",
          order: 1,
          mode: 0,
          inputPorts: [
            {
              name: "in",
              connected: true,
              datatype: { type: "BOOL" },
              value: false,
            },
          ],
          contents: [
            { name: "display", datatype: { type: "BOOL" }, value: false },
          ],
          alarms: [{ message: "Deserialization failed", active: false }],
        },
      ],
    };

    const actualReply = await client.rpcCall("LoadGraph", sendData);
    expect(actualReply).toEqual(expectedReply);
  });
});
