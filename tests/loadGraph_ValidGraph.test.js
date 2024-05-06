// loadGraph.test.js

const { AdsRpcClient } = require("mobject-client");
const ConsoleErrorToggler = require("../src/ConsoleErrorToggler");
const consoleErrorToggler = new ConsoleErrorToggler();
require("dotenv").config();

describe("Graph API Test - CreateGraph", () => {
  let client;
  let connectionError = false;

  beforeAll(async () => {
    consoleErrorToggler.disable();
    client = new AdsRpcClient(process.env.NET_ID, 851, "Main.server");
    try {
      await client.connect();
    } catch (error) {
      connectionError = true;
    } finally {
      consoleErrorToggler.enable();
    }
  });

  afterAll(async () => {
    if (!connectionError) {
      await client.disconnect();
    }
  });

  test("Check valid graph is returned for a good graph json", async () => {
    if (connectionError) {
      throw new Error(
        `Failed to connect to TwinCAT.  Please check that mobject-server is running.`
      );
    }
    const sendData = {
      graph: {
        nodes: [
          {
            id: "2",
            type: "Display/BOOL",
            order: 1,
            mode: 0,
            inputs: [
              {
                name: "in",
                type: "BOOL",
              },
            ],
            title: "BOOL",
          },
          {
            id: "1",
            type: "Literal/BOOL",
            order: 0,
            mode: 0,
            outputs: [
              {
                name: "out",
                type: "BOOL",
              },
            ],
            title: "BOOL",
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
            { name: "out", datatype: { typeName: "BOOL" }, value: false },
          ],
          parameters: [
            { name: "value", datatype: { typeName: "BOOL" }, value: true },
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
              datatype: { typeName: "BOOL" },
              value: false,
            },
          ],
          contents: [
            { name: "display", datatype: { typeName: "BOOL" }, value: false },
          ],
          alarms: [{ message: "Deserialization failed", active: false }],
        },
      ],
    };

    const actualReply = await client.rpcCall("CreateGraph", sendData);
    expect(actualReply).toEqual(expectedReply);
  });
});
