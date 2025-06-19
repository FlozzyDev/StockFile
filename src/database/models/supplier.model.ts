import mongoose from "mongoose";
import { ISupplier } from "../../types/supplier.types";

const supplierSchema = new mongoose.Schema<ISupplier>({
    name: { type: String, required: true },
    website: { type: String, required: false },
    address: { type: Boolean, required: false },
    addressLine1: { type: String, required: false },
    addressLine2: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false }
}, { timestamps: true });

const Supplier = mongoose.model<ISupplier>('Supplier', supplierSchema);
export default Supplier;