import mongoose from "mongoose";
import { ILocation } from "../../types/location.types";

const locationSchema = new mongoose.Schema<ILocation>({
    locationId: {
        type: Number,
        required: false,
        unique: true,
        index: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: false, default: null }
}, { timestamps: true, id: true, versionKey: false });

locationSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastLocation = await Location.findOne().sort({ locationId: -1 });
      this.locationId = lastLocation ? (lastLocation.locationId || 0) + 1 : 1;
    }
    next();
});

const Location = mongoose.model<ILocation>('Location', locationSchema);
export default Location;

// import mongoose from "mongoose";
// import { ILocation } from "../../types/location.types.js";

// const locationSchema = new mongoose.Schema<ILocation>({
//   locationId: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   name: { type: String, required: true },
//   description: { type: String, required: false, default: null },
// }, { timestamps: true, id: true, versionKey: false });

// const Location = mongoose.model<ILocation>('Location', locationSchema);

// export default Location;
