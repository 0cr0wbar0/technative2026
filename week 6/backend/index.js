import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postgres from "pg";
import fs from "node:fs";
import http from "http";
import bodyParser from "body-parser";
import busboy from "connect-busboy";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
  body += "<h1>" + new String(result.rows[0].now) + "</h1>";

  res.send({ response: body });
});

app.post("/upload", (req, res) => {
  let serverResponse = {};
  req.pipe(req.busboy);
  req.busboy.on("file", (fieldname, file, filename) => {
    console.log(fieldname, file, filename);
    serverResponse = {
      fieldname: fieldname,
      file: file,
      filename: filename,
    };
    res.status(200).send(serverResponse);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
