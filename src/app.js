require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/user.router");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Listening server on port ${port}.`);
});
