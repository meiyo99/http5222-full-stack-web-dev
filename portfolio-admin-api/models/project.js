import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed']
    },
    startDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Project', projectSchema);