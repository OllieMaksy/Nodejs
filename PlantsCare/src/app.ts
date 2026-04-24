import express from "express";
import { plantRouter } from "./routes/plant.r";
import { usersRouter } from "./routes/users.r";
import { authRouter } from "./routes/auth.r";
import { userPlantRouter } from "./routes/userPlant.r";
import { careLogRouter } from "./routes/catalog.r";
import { reminderRouter } from "./routes/reminder.r";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Library API is running" });
});

app.use("/auth", authRouter);
app.use("/plant", plantRouter);
app.use("/users", usersRouter);
app.use("/my-plants", userPlantRouter);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/my-plants/:id", careLogRouter);
app.use("/api/reminders", reminderRouter);
export default app;