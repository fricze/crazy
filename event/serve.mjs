// // Import the HTTP module
// import { createServer } from "http";

// // Define the port on which the server will listen
// const PORT = 3000;

// // Create an HTTP server
// const server = createServer((req, res) => {
//   // Set the response HTTP headers
//   // res.writeHead(200, { "Content-Type": "application/json" });

//   // // Define different responses based on the request method and URL
//   // if (req.method === "GET" && req.url === "/") {
//   //   res.end(JSON.stringify({ message: "Welcome to the Node.js HTTP server!" }));
//   // } else if (req.method === "GET" && req.url === "/status") {
//   //   res.end(JSON.stringify({ status: "Server is running!" }));
//   // } else if (req.method === "POST" && req.url === "/save") {
//   //   console.log("Saving data...");
//   //   res.end(JSON.stringify({ message: "Welcome to the Node.js HTTP server!" }));
//   // } else {
//   //   // Handle 404 for other routes
//   //   res.writeHead(404, { "Content-Type": "application/json" });
//   //   res.end(JSON.stringify({ error: "Not Found" }));
//   // }

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   // res.end("Hello, World!");
//   res.end(JSON.stringify({ message: "Welcome to the Node.js HTTP server!" }));
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

import { createServer } from "http";
const port = 3000;

createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (["GET", "POST"].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    res.end("Hello World");
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
}).listen(port);
