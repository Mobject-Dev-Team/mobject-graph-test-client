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

  test("Check error is returned when given a malformed json, missing node id", async () => {
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
            type: "PlcBasic.Display.Bool",
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
        ],
        uuid: "8506b771-8bd4-4160-984e-e0e4aa529fec",
      },
    };

    await expect(client.rpcCall("CreateGraph", sendData)).rejects.toThrow(
      "Deserialization Failed, Missing Key : id"
    );
  });
});
