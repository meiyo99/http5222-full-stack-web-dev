import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    technology: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Programming', 'Framework', 'Database', 'Tool']
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    }
});

export default mongoose.model('Skill', skillSchema);