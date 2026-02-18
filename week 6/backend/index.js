import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postgres from "pg";
import fs from "node:fs";
import path from "path";
import bodyParser from "body-parser";
import busboy from "connect-busboy";

dotenv.config();
const app = express();
app.use(cors());
// serving ./public as /static
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboy());
const port = process.env.PORT;
const { Client } = postgres;

app.get("/", async (req, res) => {
  console.log("connection received!");
  res.statusCode = 200;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const result = await client.query('select "file_path" from "Images"');

  let responseMap = new Map();

  for (let i = 0; i < result.rows.length; i++) {
    responseMap.set(
      `image-${i}`,
      "http://localhost:3000/static/" + result.rows[i].file_path,
    );
  }

  let responseData = Object.fromEntries(responseMap);

  await client.end();

  res.send(responseData);
});

app.post("/upload", (req, res) => {
  let serverResponse = {};
  req.pipe(req.busboy);
  req.busboy.on("file", async (fieldname, file, filename) => {
    const saveFileClient = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await saveFileClient.connect();

    const fileNameCheck = await saveFileClient.query(
      'select * from "Images" where "file_path" = $1',
      [filename.filename],
    );

    if (fileNameCheck.rows.length > 0) {
      throw new Error("File already exists in database!");
    }

    const saveTo = path.join("./public", `${filename.filename}`);
    await new Promise((resolve, reject) => {
      file.pipe(
        fs.createWriteStream(saveTo, (error) => {
          reject(error);
        }),
      );
      resolve();
    });

    await saveFileClient.query(
      'insert into "Images" ("file_path") values ($1)',
      [filename.filename],
    );

    console.log(`Received file: ${filename.filename}. ${filename.mimeType}`);
    serverResponse = {
      fieldname: fieldname,
      file: file,
      filename: filename,
    };
    await saveFileClient.end();
  });
  req.busboy.on("error", (error) => {
    res.status(500).send({ error: error });
  });
  req.busboy.on("close", () => {
    res.status(200).send(serverResponse);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
