import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Subject from "./subject.model.js";


export const createSubject = asyncHandler(async (req, res) => {
    const { name, slug, category } = req.body;

    const existingSubject = await Subject.findOne({ slug });
    if (existingSubject) {
        throw new ApiError(400, "Subject already exists");
    }

    const subject = await Subject.create({ name, slug, category });

    return res.status(201).json(
        new ApiResponse(201, "Subject created successfully", {
            _id: subject._id,
            name: subject.name,
            slug: subject.slug,
            category: subject.category
        })
    );
});

export const updateSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, slug, category } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(id, { name, slug, category }, { new: true, runValidators: true });

    if (!updatedSubject) {
        throw new ApiError(404, "Subject not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Subject updated successfully", {
            _id: updatedSubject._id,
            name: updatedSubject.name,
            slug: updatedSubject.slug,
            category: updatedSubject.category
        })
    );
});