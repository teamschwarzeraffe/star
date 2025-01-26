console.log(`

Setting up vitest in browser env...

`);
import { dirname, join } from "path";
import http from "http";
import fs from "fs";
import path from "path";

var __dirname = dirname(__filename);
var root = path.join(__dirname, "..", "..");
var setup = async () => {
  var server = http
    .createServer(function (request, response) {
      var filePath = "." + request.url;

      var extname = path.extname(filePath);
      let contentType = "text/html";
      switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".wav":
          contentType = "audio/wav";
          break;
      }

      fs.readFile(join(root, filePath), function (error, content) {
        if (error) {
          if (error.code == "ENOENT") {
            response.writeHead(404);
            response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
            response.end();
          } else {
            response.writeHead(500);
            response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
            response.end();
          }
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        }
      });
    })
    .listen(3000);

  return () => {
    // teardown
    if (server) {
      server.close();
    }
  };
};

export default setup;
