import { Connection, createConnection } from "mongoose";
import { dbLogin } from "../config";

let conn: Connection | undefined = undefined;

async function init() {
  createConnection(dbLogin, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    keepAlive: true
  }).then(connection => {
    conn = connection;
    console.log(`connected to mongodb`);
  }).catch(err => console.log(`failed to connect to mongodb`, err))
}

export { init as dbinit, conn };
