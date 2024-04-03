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

  test("Check datatypes are returned", async () => {
    if (connectionError) {
      throw new Error(
        `Failed to connect to TwinCAT.  Please check that mobject-server is running.`
      );
    }

    const expectedReply = {
      datatypes: [
        { type: "BOOL" },
        { type: "BYTE" },
        { type: "DINT" },
        { type: "DT" },
        { type: "DWORD" },
        { type: "INT" },
        { type: "LINT" },
        { type: "LREAL" },
        { type: "LWORD" },
        { type: "REAL" },
        { type: "SINT" },
        { type: "STRING" },
        { type: "TIME_OF_DAY" },
        { type: "TOD" },
        { type: "UDINT" },
        { type: "UINT" },
        { type: "ULINT" },
        { type: "USINT" },
        { type: "WORD" },
        {
          name: "TIMESTRUCT",
          type: "STRUCT",
          members: {
            wDay: {
              type: "WORD",
            },
            wDayOfWeek: {
              type: "WORD",
            },
            wHour: {
              type: "WORD",
            },
            wMilliseconds: {
              type: "WORD",
            },
            wMinute: {
              type: "WORD",
            },
            wMonth: {
              type: "WORD",
            },
            wSecond: {
              type: "WORD",
            },
            wYear: {
              type: "WORD",
            },
          },
        },
        {
          name: "FLOAT",
          type: "ALIAS",
          baseType: {
            type: "LREAL",
          },
        },
        {
          name: "HRESULT",
          type: "ALIAS",
          baseType: {
            type: "DINT",
          },
        },
      ],
    };

    const actualReply = await client.rpcCall("GetDatatypes", {});
    expect(actualReply).toEqual(expectedReply);
  });
});
