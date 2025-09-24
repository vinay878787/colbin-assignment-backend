import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./db/db";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/users", userRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express 🚀");
});

// Global error handler (should be after all routes)
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
    console.log(`Server running on ${baseUrl}`);
  });
});
