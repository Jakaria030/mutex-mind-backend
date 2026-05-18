import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Exam from "./exam.model.js";


// ========== Only For Admin ==========
export const createExam = asyncHandler(async (req, res) => {
    const {
        subject,
        name,
        difficulty,
        totalQuestions,
        duration,
    } = req.body;

    const exam = await Exam.create({
        subject,
        name,
        difficulty,
        totalQuestions,
        duration,
    });

    // Populate subject data
    const populatedExam = await Exam.findById(exam._id)
        .populate("subject", "name iconName");

    return res.status(201).json(
        new ApiResponse(201, "Exam created successfully", populatedExam)
    );
});

export const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find()
        .populate("subject", "name iconName");

    return res.status(200).json(
        new ApiResponse(200, "All exams fetched successfully", exams)
    );
});

export const togglePublishExam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
        throw new ApiError(404, "Exam not found");
    }

    exam.isPublished = !exam.isPublished;
    await exam.save();

    return res.status(200).json(
        new ApiResponse(200, `Exam ${exam.isPublished ? "published" : "unpublished"}`)
    );
});

export const updateExam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        subject,
        name,
        difficulty,
        totalQuestions,
        duration,
    } = req.body;

    // Update exam
    const updatedExam = await Exam.findByIdAndUpdate(
        id,
        {
            subject,
            name,
            difficulty,
            totalQuestions,
            duration,
        },
        {
            new: true,
            runValidators: true,
        }
    ).populate("subject", "name iconName");

    // Not found
    if (!updatedExam) {
        throw new ApiError(404, "Exam not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Exam updated successfully", updatedExam)
    );
});