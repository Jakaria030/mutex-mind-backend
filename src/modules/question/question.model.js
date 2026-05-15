import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },

        isCorrect: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const questionSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        options: {
            type: [optionSchema],
            validate: {
                validator: (options) => options.length >= 2,
                message: "At least 2 options are required",
            },
        },

        marks: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;