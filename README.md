# mobject-graph-test-client

This is a node.js test tool for testing implementations of mobject-graph. You create `<yourtest>_Send.json` in the tests folder, and it will send this to mobject-graph using the ads server. The reply `<yourtest>_Reply.json` will be used to compare the return value.

## Prerequisites

Before running this project, make sure you have:

- Node.js installed on your system.

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

## Running the tests

Run the tests using the following command:

```
npm test
```

## Running the Application

If you are making changes to the core of the application, or authoring test and want it to restart on change then you can use the following command:

```
npm start
```
