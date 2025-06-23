import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    images: [{ type: String }],
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // <-- Agregado
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, { timestamps: true });

export default mongoose.model("Product", productSchema);