const { AdsRpcClient } = require("mobject-client");
const fs = require("fs").promises;
const path = require("path");
const assert = require("assert");

const directoryPath = path.join(__dirname, "./tests");
const client = new AdsRpcClient("127.0.0.1.1.1", 851, "Main.server");

// Function to read file content and parse JSON
const readFileContent = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

// Function to compare objects
const compareObjects = (object1, object2) => {
  try {
    assert.deepStrictEqual(object1, object2);
    return true;
  } catch (err) {
    return false;
  }
};

// Function to process test files
const processTestFiles = async (sendFilePath, replyFilePath) => {
  const sendData = await readFileContent(sendFilePath);
  const expectedReply = await readFileContent(replyFilePath);
  const actualReply = await client.rpcCall("LoadGraph", sendData.payload);

  if (compareObjects(actualReply, expectedReply)) {
    console.log(`Test passed for ${path.basename(sendFilePath)}`);
  } else {
    console.log(`Test failed for ${path.basename(sendFilePath)}`);
  }
};

const runTests = async () => {
  try {
    await client.connect();
    const files = await fs.readdir(directoryPath);

    // Filter and group files by test name
    const filePairs = files.reduce((acc, file) => {
      const match = file.match(/(.+?)_(Send|Reply)\.json$/);
      if (match) {
        const [, testName, fileType] = match;
        acc[testName] = acc[testName] || { Send: null, Reply: null };
        acc[testName][fileType] = path.join(directoryPath, file);
      }
      return acc;
    }, {});

    // Process each pair
    for (const [testName, files] of Object.entries(filePairs)) {
      if (files.Send && files.Reply) {
        console.log(`\nProcessing ${testName} files:`);
        await processTestFiles(files.Send, files.Reply);
      } else {
        console.log(`Incomplete file pair for test: ${testName}`);
      }
    }
  } catch (err) {
    console.error(`Error running tests: ${err}`);
  } finally {
    await client.disconnect();
  }
};

runTests();
