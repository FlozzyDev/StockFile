import mongoose from "mongoose";
import { ICategory } from "../../types/category.types";

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    notes: { type: String, required: false }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
