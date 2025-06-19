import mongoose from "mongoose";
import { IItem } from "../../types/item.types.js";

const itemSchema = new mongoose.Schema<IItem>({
    name: { type: String, required: true },
    categoryId: { type: String, required: false },
    supplierId: { type: String, required: false },
    locationId: { type: String, required: true },
    purchaseDate: { type: Date, required: false },
    quantity: { type: Number, required: true },
    price: { type: Number, required: false },
    imageUrl: { type: String, required: false },
    SerialNumber: { type: String, required: false },
    warranty: { type: Boolean, required: false },
    expiration: { type: Boolean, required: false },
    expirationDate: { type: Date, required: false },
    warrantyDate: { type: Date, required: false },
    notes: { type: String, required: false },
}, { timestamps: true });

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;