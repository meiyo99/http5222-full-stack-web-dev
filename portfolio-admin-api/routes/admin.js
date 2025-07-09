import express from "express";
import Project from "../models/project.js";
import Skill from "../models/skill.js";

const router = express.Router();

// admin page
router.get('/', async (req, res) => {
    const projects = await Project.find().sort({ startDate: -1 });
    const skills = await Skill.find().sort({ category: 1 });
    res.render('index', { projects, skills });
});

// Add project
router.post('/projects', async (req, res) => {
    await Project.create(req.body);
    res.redirect('/');
});

// Delete project
router.post('/projects/delete/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Add skill
router.post('/skills', async (req, res) => {
    await Skill.create(req.body);
    res.redirect('/');
});

// Delete skill
router.post('/skills/delete/:id', async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

export default router;