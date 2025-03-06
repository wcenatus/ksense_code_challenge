import { Request, Response } from "express";
import { db } from "../db/db";

interface Payload {
  id: number;
  header: string;
  body: string;
  query: string;
}

export const create = async (req: Request, res: Response) => {
  console.log("Payload:", req);
  //Here I'm capturing relavant data in from the request because we
  //do not know if the secret message is in the body,headers, or query
  const { headers, body, query } = req;

  //Storing the data in the database
  const dbquery = `INSERT INTO payload (header,body,query) VALUES (?,?,?)`;
  db.run(
    dbquery,
    [JSON.stringify(headers), JSON.stringify(body), JSON.stringify(query)],
    (err) => {
      if (err) {
        console.error("Insert Error:", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
};

//Route for Getting all payload data (extra)
export const getAll = async (req: Request, res: Response) => {
  const dbquery = `SELECT * FROM payload`;
  db.all(dbquery, (err, rows: Payload[]) => {
    if (err) {
      console.error("Select Error:", err);
      res.sendStatus(500);
    } else {
      res.json(
        rows.map((row) => ({
          id: row.id,
          body: JSON.parse(row.body),
          header: JSON.parse(row.header),
          query: JSON.parse(row.query),
        }))
      );
    }
  });
};
