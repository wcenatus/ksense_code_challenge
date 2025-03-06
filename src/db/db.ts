import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Connected to the database.");
  }
});

const initDB = () => {
  const createTable =
    "CREATE TABLE IF NOT EXISTS payload (id INTEGER PRIMARY KEY, header TEXT, body TEXT, query TEXT)";
  db.run(createTable, (err) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Payload table created successfully.");
  });
};

export { db, initDB };
