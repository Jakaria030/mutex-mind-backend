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
import subjectRoute from "./modules/subject/subject.route.js";


// Routes middlewares
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoute);


// Health check route
app.get("/", (_req, res) => {
    res.send("Mutex Mind backend is running!");
});

// Global error handler
app.use(errorHandler);

export default app;