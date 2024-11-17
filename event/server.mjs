import express from "express";
import cors from "cors";
import fs from "node:fs";
import { makeScreenshot } from "./save.mjs";

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/save", (req, res) => {
  const postData = req.body.webpage
    .replaceAll("&#10;", "")
    .replaceAll("&amp;", "&");

  const fileName = req.body.fileName;

  fs.writeFile("./speaker_prev.html", postData, async (err) => {
    if (err) {
      console.error(err);
    } else {
      const img = await makeScreenshot(fileName);

      const imgBlob = new Blob([img], { type: "image/png" });

      res.type(imgBlob.type);
      imgBlob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf));
      });
    }
  });
});

app.get("/:name", (req, res) => {
  let name = req.params.name;

  res.json({
    message: `Hello ${name}`,
  });
});

app.listen(2020, () => {
  console.log("server is listening on port 2020");
});
