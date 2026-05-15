import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Attempt from "./attempt.model.js";
import Exam from "../exam/exam.model.js";

export const createAttempt = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const { exam, answers, timeTaken } = req.body;

    // Check exam exists
    const examExists = await Exam.findById(exam);

    if (!examExists) {
        throw new ApiError(404, "Exam not found");
    }

    // Basic validation
    if (!answers || answers.length === 0) {
        throw new ApiError(400, "No answers submitted");
    }

    // Initialize counters
    let correctAnswers = 0;
    let wrongAnswers = 0;

    // Process each answer
    answers.forEach((answare) => {
        const selected = answare.options.find((option) => option.isSelected);

        if (!selected) return;
        if (selected.isCorrect) correctAnswers++;
        else wrongAnswers++;
    });

    const score = correctAnswers - (wrongAnswers * 0.25);

    // Create attempt
    const attempt = await Attempt.create({
        user: userId,
        exam,
        totalQuestions: answers.length,
        correctAnswers,
        wrongAnswers,
        score,
        timeTaken,
        answers
    });

    // Response
    return res.status(201).json(
        new ApiResponse(201, "Attempt submitted successfully", attempt)
    );
});