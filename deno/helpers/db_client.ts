import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();

  await client.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2tfmflc.mongodb.net/${process.env.DB_DATABASE}?authMechanism=SCRAM-SHA-1`
  );
  db = client.database("deno-crud");
}

export function getDb() {
  return db;
}
