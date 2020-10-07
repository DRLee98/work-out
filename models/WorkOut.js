import mongoose from "mongoose";

const WorkOutSchema = new mongoose.Schema({
    day: {
        type: String,
        required: "day is required",
    },
    name: {
        type: String,
        required: "name is required",
    },
    weight: {
        type: Number,
        default: 0
    },
    repsOrHold: {
        type: String,
        required: "repsOrHold is required",
    },
    count: {
        type: Number,
        required: "count is required",
    },
    set: {
        type: Number,
        default: 1,
    },
    breakTime: {
        type: Number,
        default: 60,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const model = mongoose.model("WorkOut", WorkOutSchema);
export default model;

