import "dotenv/config";
import cors from "cors";
import express from "express";
import todosRouter from "./todos.js";
import randomRouter from "./random.js";
import { ZodErrorHandler } from "./errorHandler.js";

const PORT = process.env.PORT || 5005;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/todos", todosRouter);
app.use("/random", randomRouter);

app.use(ZodErrorHandler);

app.listen(PORT, () => {
  console.log(`Todo API listening on port ${PORT}`);
});
