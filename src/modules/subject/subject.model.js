import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        category: {
            type: String,
        }
    },
    {
        timestamps: true,
    },
);


const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;