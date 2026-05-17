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
            required: true,
            trim: true,
        },
        categoryColor: {
            type: String,
            required: true,
            trim: true,
        },
        iconName: {
            type: String,
            required: true,
            trim: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    },
);


const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;