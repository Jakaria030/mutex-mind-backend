import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        correctAnswers: {
            type: Number,
            default: 0,
        },
        wrongAnswers: {
            type: Number,
            default: 0,
        },
        score: {
            type: Number,
            default: 0,
        },
        timeTaken: {
            type: Number,
            default: 0,
        },
        answers: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true,
                },
                options: [
                    {
                        text: {
                            type: String,
                            required: true,
                        },
                        isCorrect: {
                            type: Boolean,
                            default: false,
                        },
                        isSelected: {
                            type: Boolean,
                            default: false,
                        },
                    }
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt;