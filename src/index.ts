//Ksense Coding Challenge
//Wesley Cenatus

//Importing the necessary packages
import express from "express";
import cors from "cors";
import ksense from "./routes/ksense";
import { initDB } from "./db/db";
const app = express();

//Init sqlite database
initDB();

//Im using the cors package to allow the server to accept
//requests from any origin.
app.use(cors());

// Enable JSON parsing to read the payload
app.use(express.json());

// Enable URL-encoded parsing for forms
app.use(express.urlencoded({ extended: true }));

//Router for the payload endpoint
app.use("/ksense", ksense);

//Default route to check if the server is up
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" }).sendStatus(200);
});

//Starting the server on port 8080
app.listen(8080, () => console.log("Listening on port 8080"));
