import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Question from "./question.model.js";
import Exam from "../exam/exam.model.js";


// ========== Only For Admin ==========
export const createQuestion = asyncHandler(async (req, res) => {
    const { exam, questions } = req.body;

    // Check exam exists
    const examExists = await Exam.findById(exam);

    if (!examExists) {
        throw new ApiError(404, "Exam not found");
    }

    // Empty check
    if (!questions || questions.length === 0) {
        throw new ApiError(400, "Questions are required");
    }

    // Validate each question
    for (const item of questions) {
        const correctAnswers = item.options.filter(
            (option) => option.isCorrect
        );

        if (correctAnswers.length !== 1) {
            throw new ApiError(400, `Question must contain exactly one correct answer`);
        }
    }

    // Prepare data
    const formattedQuestions = questions.map((item) => ({
        exam,
        question: item.question,
        options: item.options,
    }));

    // Insert many
    const newQuestions = await Question.insertMany(
        formattedQuestions
    );

    return res.status(201).json(
        new ApiResponse(201, `${newQuestions.length} question(s) created successfully`, newQuestions)
    );
});

export const getQuestionsByExam = asyncHandler(async (req, res) => {
    const { examId } = req.params;

    const questions = await Question.find({ exam: examId }).sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(200, "Questions fetched successfully", questions)
    );
});

export const updateQuestion = asyncHandler(async (req, res) => {

    const {
        question,
        options,
        marks,
    } = req.body;

    if (options) {

        const correctAnswers = options.filter(
            (option) => option.isCorrect
        );

        if (correctAnswers.length !== 1) {
            throw new ApiError(400, "Exactly one correct answer is required");
        }
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        {
            question,
            options,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedQuestion) {
        throw new ApiError(404, "Question not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Question updated successfully", updatedQuestion)
    );
});

export const deleteQuestion = asyncHandler(async (req, res) => {

    const deletedQuestion = await Question.findByIdAndDelete(
        req.params.id
    );

    if (!deletedQuestion) {
        throw new ApiError(404, "Question not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Question deleted successfully")
    );
});