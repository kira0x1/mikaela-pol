import { Connection, createConnection } from "mongoose";
import { dbLogin } from "../config";
import { initUsers } from "./dbUser";

export var conn: Connection | undefined = undefined;

async function init() {
  conn = await createConnection(dbLogin, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true
  });

  console.log(`connected to mongodb`);
  await initUsers();
}

export { init as dbinit };
