import mongoose from "mongoose";
import { IItem } from "../../types/item.types.js";

const itemSchema = new mongoose.Schema<IItem>({
    itemId: {
        type: Number,
        required: false,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    categoryId: { type: String, required: false, default: null },
    supplierId: { type: String, required: false, default: null },
    locationId: { type: String, required: false, default: null },
    purchaseDate: { type: Date, required: false, default: null },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: false, default: null },
    imageUrl: { type: String, required: false, default: null },
    SerialNumber: { type: String, required: false, default: null },
    warranty: { type: Boolean, required: false, default: false },
    expiration: { type: Boolean, required: false, default: null },
    expirationDate: { type: Date, required: false, default: null },
    warrantyDate: { type: Date, required: false, default: null },
    notes: { type: String, required: false, default: null },
}, { timestamps: true, id: true, versionKey: false });

itemSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastItem = await Item.findOne().sort({ itemId: -1 });
      this.itemId = lastItem ? (lastItem.itemId || 0) + 1 : 1;
    }
    next();
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;