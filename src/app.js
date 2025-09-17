import express from "express";
import { usersRouter } from "./routes/users-routes.js";
import { logRequest } from "./middlewares/logs.js";

const app = express();

app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.redirect("/users/lista");
});

app.listen(3000, () => {
  console.log("ESCUTANDO NA PORTA 3000");
});
