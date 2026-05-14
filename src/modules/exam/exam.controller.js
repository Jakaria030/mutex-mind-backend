import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Exam from "./exam.model.js";


export const createExam = asyncHandler(async (req, res) => {
    const {
        subject,
        name,
        description,
        difficulty,
        totalQuestions,
        duration,
    } = req.body;

    const exam = await Exam.create({
        subject,
        name,
        description,
        difficulty,
        totalQuestions,
        duration,
    });

    return res.status(201).json(
        new ApiResponse(201, "Exam created successfully", exam)
    );
});

export const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find()
        .populate("subject", "name slug category")
        .sort({ createdAt: -1 });

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
        new ApiResponse(200, `Exam ${exam.isPublished ? "published" : "unpublished"}`, exam)
    );
});