import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";  
import adminRoutes from "./routes/admin.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT || "3000";

mongoose.connect(process.env.MONGODB_URI)

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});