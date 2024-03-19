// loadGraph.test.js

const { AdsRpcClient } = require("mobject-client");
const ConsoleErrorToggler = require("../src/ConsoleErrorToggler");
const consoleErrorToggler = new ConsoleErrorToggler();

describe("LoadGraph RPC Call", () => {
  let client;
  let connectionError = false;

  beforeAll(async () => {
    consoleErrorToggler.disable();
    client = new AdsRpcClient("127.0.0.1.1.1", 851, "Main.server");
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

  test("LoadGraph with a missing node", async () => {
    if (connectionError) {
      throw new Error(
        `Failed to connect to TwinCAT.  Please check that mobject-server is running.`
      );
    }

    expect.assertions(1);

    const sendData = {
      graph: {
        nodes: [
          {
            id: "2",
            type: "PLC Basic/Display/BOOL",
            order: 1,
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
      "Deserialization Failed, Missing Key : mode"
    );
  });
});
