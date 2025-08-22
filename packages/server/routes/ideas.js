const express = require('express');
const router = express.Router();
const { generateText, generateImageFromText } = require('../utils/gemini');
const authenticateToken = require('../middleware/authMiddleware');

// Placeholder for a simple in-memory store for ideas
const ideas = [];

// GET all ideas for a user
router.get('/', authenticateToken, (req, res) => {
  const userIdeas = ideas.filter(idea => idea.userId === req.userId);
  res.json(userIdeas);
});

// GET a single idea by ID
router.get('/:id', authenticateToken, (req, res) => {
  const idea = ideas.find(i => i.id === req.params.id && i.userId === req.userId);
  if (idea) {
    res.json(idea);
  } else {
    res.status(404).json({ error: 'Idea not found' });
  }
});

// POST a new idea
router.post('/', authenticateToken, (req, res) => {
  const { title, text, tags, imageUrl } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required' });
  }
  const newIdea = {
    id: Date.now().toString(), // Simple unique ID
    title,
    text,
    tags: tags || [],
    imageUrl: imageUrl || null,
    userId: req.userId,
    createdAt: new Date(),
  };
  ideas.push(newIdea);
  res.status(201).json(newIdea);
});

// PUT (update) an idea
router.put('/:id', authenticateToken, (req, res) => {
  const { title, text, tags, imageUrl } = req.body;
  const ideaIndex = ideas.findIndex(i => i.id === req.params.id && i.userId === req.userId);

  if (ideaIndex !== -1) {
    ideas[ideaIndex] = { ...ideas[ideaIndex], title, text, tags: tags || [], imageUrl: imageUrl || null };
    res.json(ideas[ideaIndex]);
  } else {
    res.status(404).json({ error: 'Idea not found' });
  }
});

// DELETE an idea
router.delete('/:id', authenticateToken, (req, res) => {
  const initialLength = ideas.length;
  const filteredIdeas = ideas.filter(i => !(i.id === req.params.id && i.userId === req.userId));
  if (filteredIdeas.length < initialLength) {
    ideas.splice(0, ideas.length, ...filteredIdeas); // Update the in-memory array
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Idea not found' });
  }
});

// POST to generate idea suggestions using Gemini API
router.post('/suggest', authenticateToken, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const suggestion = await generateText(prompt, 500);
    res.json({ suggestion });
  } catch (error) {
    console.error('Error generating suggestion:', error);
    res.status(500).json({ error: 'Failed to generate suggestion' });
  }
});

module.exports = router;