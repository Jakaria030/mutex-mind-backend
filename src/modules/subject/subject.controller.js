import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Subject from "./subject.model.js";


// ========== Only For Admin ==========
export const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find();

    return res.status(200).json(
        new ApiResponse(200, "Subjects fetch successfully.", { subjects })
    );
});

export const createSubject = asyncHandler(async (req, res) => {
    const { name, slug, category, categoryColor, iconName } = req.body;

    const existingSubject = await Subject.findOne({ slug });
    if (existingSubject) {
        throw new ApiError(400, "Subject slug already exists");
    }

    const subject = await Subject.create({ name, slug, category, categoryColor, iconName });

    return res.status(201).json(
        new ApiResponse(201, "Subject created successfully", { subject })
    );
});

export const updateSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, slug, category, categoryColor, iconName } = req.body;

    const existingSubject = await Subject.findOne({ _id: { $ne: id }, slug: slug });
    if (existingSubject) {
        throw new ApiError(400, "Subject slug already exists");
    }

    const updatedSubject = await Subject.findByIdAndUpdate(id, { name, slug, category, categoryColor, iconName }, { new: true, runValidators: true });

    if (!updatedSubject) {
        throw new ApiError(404, "Subject not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Subject updated successfully", { subject: updatedSubject })
    );
});

export const publishSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Toggle isPublished
    subject.isPublished = !subject.isPublished;

    await subject.save();

    return res.status(200).json(
        new ApiResponse(200, "Subject publish status updated successfully")
    );
});