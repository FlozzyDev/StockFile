import mongoose from "mongoose";
import { ILocation } from "../../types/location.types";

const locationSchema = new mongoose.Schema<ILocation>({
    name: { type: String, required: true },
    description: { type: String, required: false }
}, { timestamps: true });

const Location = mongoose.model<ILocation>('Location', locationSchema);
export default Location;