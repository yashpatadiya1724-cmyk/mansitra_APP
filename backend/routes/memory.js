const express = require('express');
const router = express.Router();
const { vectorMemoryEngine } = require('../services/vectorMemoryService');

/**
 * POST /api/memory/store
 * Saves an emotional conversation turn into long-term vector memory.
 */
router.post('/store', (req, res) => {
  const { studentId, text, emotion, moodRating, contextTag } = req.body;

  if (!studentId || !text) {
    return res.status(400).json({ error: 'Missing required studentId or text' });
  }

  const record = vectorMemoryEngine.storeStudentMemory({
    studentId,
    text,
    emotion,
    moodRating,
    contextTag,
  });

  res.status(201).json({ success: true, recordId: record.id });
});

/**
 * POST /api/memory/query
 * Semantic RAG retrieval: Finds past memories relevant to student's current prompt.
 */
router.post('/query', (req, res) => {
  const { studentId, queryText, topK = 3 } = req.body;

  if (!studentId || !queryText) {
    return res.status(400).json({ error: 'Missing required studentId or queryText' });
  }

  const memories = vectorMemoryEngine.retrieveRelevantMemories({
    studentId,
    queryText,
    topK,
  });

  res.json({ success: true, count: memories.length, memories });
});

/**
 * GET /api/memory/timeline/:studentId
 * Returns historical mood and emotion trajectory.
 */
router.get('/timeline/:studentId', (req, res) => {
  const { studentId } = req.params;
  const timeline = vectorMemoryEngine.getEmotionalTimeline(studentId);
  res.json({ success: true, studentId, timeline });
});

module.exports = router;
