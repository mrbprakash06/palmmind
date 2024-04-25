const express = require("express");
const bodyParser = require("body-parser"); 

const connect = require("./db");
const userRouter = require("./routes/users");

const app = express();
app.set("view engine", "pug");

app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.use("/users", userRouter)

async function run() {
  // DB Connection
  await connect();

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Listening on port", port));
}

run();
