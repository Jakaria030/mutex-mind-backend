import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
            required: true,
        },
        totalQuestions: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;