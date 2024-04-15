const { AdsRpcClient } = require("mobject-client");
require("dotenv").config();
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function callGetDatatypes() {
  const client = new AdsRpcClient(process.env.NET_ID, 851, "Main.server");

  try {
    await client.connect();
    const sendData = {};
    const response = await client.rpcCall("GetDatatypes", sendData);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("An error occurred during the API call:", error.message);
  } finally {
    await client.disconnect();
  }
}

async function callGetBlueprints() {
  const client = new AdsRpcClient(process.env.NET_ID, 851, "Main.server");

  try {
    await client.connect();
    const sendData = {};
    const response = await client.rpcCall("GetBlueprints", sendData);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("An error occurred during the API call:", error.message);
  } finally {
    await client.disconnect();
  }
}

async function callCreateBasicGraph() {
  const client = new AdsRpcClient(process.env.NET_ID, 851, "Main.server");

  try {
    await client.connect();
    const sendData = {
      graph: {
        nodes: [
          {
            id: "2",
            type: "PlcBasic.Bool.BoolDisplay",
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
            type: "PlcBasic.Bool.BoolLiteral",
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
    const response = await client.rpcCall("CreateGraph", sendData);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("An error occurred during the API call:", error.message);
  } finally {
    await client.disconnect();
  }
}

async function callGetStatus() {
  const client = new AdsRpcClient(process.env.NET_ID, 851, "Main.server");

  try {
    await client.connect();
    const sendData = { graphUuid: "8506b771-8bd4-4160-984e-e0e4aa529fec" };
    const response = await client.rpcCall("GetStatus", sendData);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("An error occurred during the API call:", error.message);
  } finally {
    await client.disconnect();
  }
}

function displayOptionsAndAsk() {
  console.log("Please select an API function to call:");
  console.log("0: Get Datatypes");
  console.log("1: Get Blueprints");
  console.log("2: Create Basic Graph");
  console.log("3: Get Status");
  console.log("x: Exit");

  rl.question("Enter your choice (or 'x' to exit): ", function (answer) {
    switch (answer) {
      case "0":
        callGetDatatypes().then(() => {
          displayOptionsAndAsk();
        });
        break;
      case "1":
        callGetBlueprints().then(() => {
          displayOptionsAndAsk();
        });
        break;
      case "2":
        callCreateBasicGraph().then(() => {
          displayOptionsAndAsk();
        });
        break;
      case "3":
        callGetStatus().then(() => {
          displayOptionsAndAsk();
        });
        break;
      case "x":
        console.log("Exiting.");
        rl.close();
        break;
      default:
        console.log("Invalid selection. Please try again.");
        displayOptionsAndAsk();
    }
  });
}

function main() {
  displayOptionsAndAsk();
}

main();
