const { AdsRpcClient } = require("mobject-client");
const ConsoleErrorToggler = require("../src/ConsoleErrorToggler");
const consoleErrorToggler = new ConsoleErrorToggler();
require("dotenv").config();

describe("Graph API Test - GetDatatypes", () => {
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

  test("Check asking for content on a missing graph provides error", async () => {
    if (connectionError) {
      throw new Error(
        `Failed to connect to TwinCAT.  Please check that mobject-server is running.`
      );
    }

    await expect(
      client.rpcCall("GetContentValue", {
        graphUuid: "123",
        nodeId: "1",
        contentName: "test",
      })
    ).rejects.toThrow("Invalid graphUuid");
  });
});
