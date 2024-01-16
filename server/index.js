const express = require("express");
const cors = require("cors");
const Db = require("./config/db");
const userRouter = require("./routes/auth");
const InventoryRouter = require("./routes/inventory");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", userRouter);
app.use("/inventory", InventoryRouter);

Db(process.env.MongoDB)
  .then(() =>
    app.listen(port, () =>
      console.log(`server is running at http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
