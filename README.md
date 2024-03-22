# mobject-graph-test-client

This is a node.js test tool for testing implementations of mobject-graph. You create `<yourtest>.test.js` in the tests folder. Use the existing tests as an example.

## Prerequisites

Before running this project, make sure you have:

- Node.js installed on your system.
- mobject-graph TwinCAT project, with mobject-graph-test-project active and running.

## Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/Mobject-Dev-Team/mobject-graph-test-client.git
   cd mobject-graph-test-client
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a .env file in the root directory of the project and add your TwinCAT Net Id as follows:

```
NET_ID=127.0.0.1.1.1
```

## Running the tests

Run the tests using the following command:

```
npm test
```

## Running the tests on file change

If you are authoring tests and want the tests to restart on change then you can use the following command:

```
npm run test:watch
```
