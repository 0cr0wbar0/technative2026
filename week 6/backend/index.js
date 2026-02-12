import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postgres from "pg";
import fs from "node:fs";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import busboy from "connect-busboy";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(busboy());
const port = process.env.PORT;
const { Pool } = postgres;

app.get("/", async (req, res) => {
  res.statusCode = 200;
  let body = "<h1>hi :3c</h1>";

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const result = await pool.query("SELECT NOW()");
  body += "<h1>" + String(result.rows[0].now) + "</h1>";

  res.send({ response: body });
});

app.post("/upload", (req, res) => {
  let serverResponse = {};
  req.pipe(req.busboy);
  req.busboy.on("file", async (fieldname, file, filename) => {
    const saveTo = path.join("./static", `${filename.filename}`);
    await new Promise((resolve, reject) => {
      file.pipe(
        fs.createWriteStream(saveTo, (error) => {
          reject(error);
        }),
      );
      resolve();
    });
    console.log(`Received file: ${filename.filename}. ${filename.mimeType}`);
    serverResponse = {
      fieldname: fieldname,
      file: file,
      filename: filename,
    };
  });
  req.busboy.on("close", () => {
    res.status(200).send(serverResponse);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
