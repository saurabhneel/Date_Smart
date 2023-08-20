const env = require("../env");
const message = require("./helper/message");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();

  const database = require("./database/database");
  const users = require("./routes/users");

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.disable("x-powered-by");

  // app.use((req, res, next) => {
  //   const userAgent = req.get("User-Agent");
  //   if (userAgent && userAgent.includes("Postman")) {
  //     res.status(403).send("Forbidden: Postman requests are not allowed.");
  //   } else {
  //     next();
  //   }
  // });

  app.get("/", (req, res) => {
    res.status(200).send(message.codeWorking);
  });

  app.use(users);

  app.use((req, res, next) => {
    res.status(404).send("404");
  });

  app.listen(env.PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
