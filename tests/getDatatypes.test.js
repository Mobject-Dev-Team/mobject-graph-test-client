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

  test("Ensure non-empty datatypes are returned", async () => {
    if (connectionError) {
      throw new Error(
        `Failed to connect to TwinCAT.  Please check that mobject-server is running.`
      );
    }

    const actualReply = await client.rpcCall("GetDatatypes", {});
    expect(Array.isArray(actualReply.datatypes)).toBeTruthy();
    expect(actualReply.datatypes.length).toBeGreaterThan(0);
  });

  test("Validate datatype structure", async () => {
    const actualReply = await client.rpcCall("GetDatatypes", {});

    actualReply.datatypes.forEach((datatype) => {
      switch (datatype.datatype) {
        case "STRUCT":
          expect(datatype).toHaveProperty("identifier");
          expect(datatype).toHaveProperty("members");
          break;
        case "ALIAS":
          expect(datatype).toHaveProperty("identifier");
          expect(datatype).toHaveProperty("baseDatatype");
          break;
        case "ENUM":
          expect(datatype).toHaveProperty("identifier");
          expect(datatype).toHaveProperty("baseDatatype");
          break;
        default: // Assuming 'default' means a primitive type
          expect(datatype).toHaveProperty("name");
          break;
      }
    });
  });
});
