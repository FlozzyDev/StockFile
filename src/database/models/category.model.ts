import mongoose from "mongoose";
import { ICategory } from "../../types/category.types";

const categorySchema = new mongoose.Schema<ICategory>({
    categoryId: {
        type: Number,
        required: false,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: false, default: null }
}, { timestamps: true, id: true, versionKey: false });

categorySchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastCategory = await Category.findOne().sort({ categoryId: -1 });
      this.categoryId = lastCategory ? (lastCategory.categoryId || 0) + 1 : 1;
    }
    next();
});

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
