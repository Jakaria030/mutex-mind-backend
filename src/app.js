import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Import routes
import userRoutes from "./modules/user/user.route.js";
import subjectRoutes from "./modules/subject/subject.route.js";
import examRoutes from "./modules/exam/exam.route.js";
import questionRoutes from "./modules/question/question.route.js";
import attemptRoutes from "./modules/attempt/attempt.route.js";

// Routes middlewares
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);

// Health check route
app.get("/", (_req, res) => {
    res.send("Mutex Mind backend is running!");
});

// Global error handler
app.use(errorHandler);

export default app;