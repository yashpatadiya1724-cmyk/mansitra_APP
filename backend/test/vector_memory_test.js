/**
 * Test Suite: Manasitra Vector Memory & Cosine Similarity Engine
 * Project: Manasitra — "Friend of the Mind"
 */

const assert = require('assert');
const {
  vectorMemoryEngine,
  calculateCosineSimilarity,
  generateSemanticEmbedding,
} = require('../services/vectorMemoryService');

console.log('Running Manasitra Vector Memory RAG Unit Tests...');

// Test 1: Vector Embedding Dimensionality & Normalization
const vec = generateSemanticEmbedding('I feel overwhelmed by my college exams and study load');
assert.strictEqual(vec.length, 64, 'Embedding must produce 64 dimensions');

// Test L2 norm of generated vector
const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
assert(Math.abs(norm - 1.0) < 0.001, `Embedding must be L2-normalized to 1.0, got: ${norm}`);
console.log('[PASS] Semantic embedding generation & L2 normalization verified');

// Test 2: Cosine Similarity Properties
const vecIdentical = generateSemanticEmbedding('I feel overwhelmed by my college exams and study load');
const simSelf = calculateCosineSimilarity(vec, vecIdentical);
assert(Math.abs(simSelf - 1.0) < 0.0001, `Self-similarity must equal 1.0, got: ${simSelf}`);

const vecUnrelated = generateSemanticEmbedding('The quick brown fox jumps over the lazy dog');
const simUnrelated = calculateCosineSimilarity(vec, vecUnrelated);
assert(simUnrelated < 0.5, `Unrelated topic similarity must be low, got: ${simUnrelated}`);
console.log(`[PASS] Cosine distance verified (Identical: ${simSelf}, Unrelated: ${simUnrelated.toFixed(2)})`);

// Test 3: Store Multiple Memory Sessions for Student
const studentId = 'student_aryan_9921';
vectorMemoryEngine.storeStudentMemory({
  studentId,
  text: 'I could not sleep last night because of severe anxiety and insomnia.',
  emotion: 'anxious',
  moodRating: 3,
  contextTag: 'sleep_health',
  timestamp: '2026-10-20T22:30:00Z',
});

vectorMemoryEngine.storeStudentMemory({
  studentId,
  text: 'Had lunch with my campus friends and felt much more relaxed today.',
  emotion: 'happy',
  moodRating: 8,
  contextTag: 'social',
  timestamp: '2026-10-25T14:15:00Z',
});

vectorMemoryEngine.storeStudentMemory({
  studentId,
  text: 'My midterm exam preparation is stressing me out, feeling panicked.',
  emotion: 'panicked',
  moodRating: 2,
  contextTag: 'academics',
  timestamp: '2026-10-30T19:00:00Z',
});

// Test 4: RAG Retrieval Query (Asking about sleep problems)
const sleepMemories = vectorMemoryEngine.retrieveRelevantMemories({
  studentId,
  queryText: 'I am struggling to fall asleep at night',
  topK: 1,
});

assert.strictEqual(sleepMemories.length, 1);
assert.strictEqual(sleepMemories[0].contextTag, 'sleep_health');
assert(sleepMemories[0].similarity > 0.4, 'Must return high similarity for sleep query');
console.log(`[PASS] Semantic RAG retrieval correctly matched sleep memory (Score: ${sleepMemories[0].similarity})`);

// Test 5: RAG Retrieval Query (Asking about exam pressure)
const examMemories = vectorMemoryEngine.retrieveRelevantMemories({
  studentId,
  queryText: 'feeling panic about my college test tomorrow',
  topK: 1,
});
assert.strictEqual(examMemories[0].contextTag, 'academics');
console.log(`[PASS] Semantic RAG retrieval correctly matched academic exam memory (Score: ${examMemories[0].similarity})`);

// Test 6: Emotional Timeline Export
const timeline = vectorMemoryEngine.getEmotionalTimeline(studentId);
assert.strictEqual(timeline.length, 3, 'Timeline must track all 3 sessions');
console.log('[PASS] Student emotional trajectory timeline export verified');

console.log('ALL MANASITRA VECTOR MEMORY TESTS PASSED! [OK]');
