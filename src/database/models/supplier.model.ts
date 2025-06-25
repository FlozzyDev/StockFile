import mongoose from "mongoose";
import { ISupplier } from "../../types/supplier.types.js";

const supplierSchema = new mongoose.Schema<ISupplier>({
    supplierId: {
        type: Number,
        required: false,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    website: { type: String, required: false, default: null },
    address: { type: Boolean, required: false, default: false },
    addressLine1: { type: String, required: false, default: null },
    addressLine2: { type: String, required: false, default: null },
    city: { type: String, required: false, default: null },
    state: { type: String, required: false, default: null },
    zip: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
    email: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null }
}, { timestamps: true, id: true, versionKey: false });

supplierSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastSupplier = await Supplier.findOne().sort({ supplierId: -1 });
      this.supplierId = lastSupplier ? (lastSupplier.supplierId || 0) + 1 : 1;
    }
    next();
});

const Supplier = mongoose.model<ISupplier>('Supplier', supplierSchema);
export default Supplier;