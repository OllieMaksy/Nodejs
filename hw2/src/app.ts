import express from "express";
import { booksRouter } from "./routes/books.r";
import { usersRouter } from "./routes/users.r";
import { loansRouter } from "./routes/loans.r";
import { authRouter } from "./routes/auth.r";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Library API is running" });
});

app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/loans", loansRouter);

export default app;