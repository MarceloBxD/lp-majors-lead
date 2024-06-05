import express from "express";
import cors from "cors";

const port = 3000;

import { routes } from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
