/**
 * Manasitra AI: Vector Memory & Long-Term Emotional Intelligence Engine (RAG)
 * Project: Manasitra — "Friend of the Mind" (Student Mental Health AI)
 * 
 * Provides on-device vector embedding computation, cosine similarity scoring,
 * and semantic memory recall. Enables Manasitra to remember prior conversations,
 * past emotional triggers (exam stress, burnout, insomnia), and personalized coping habits.
 */

/**
 * Calculates cosine similarity between two float vector arrays.
 * Value range: [-1.0, 1.0], where 1.0 denotes identical semantic orientation.
 */
function calculateCosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Generates a normalized semantic feature embedding vector (64 dimensions)
 * using sub-word n-gram shingles and emotional root weighting (Ponytail zero-dependency approach).
 */
function generateSemanticEmbedding(text, dimensions = 64) {
  const vector = new Float32Array(dimensions);
  if (!text || typeof text !== 'string') return Array.from(vector);

  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);

  // Emotional semantic root clusters
  const EMOTION_ROOTS = [
    ['sleep', 'insomnia', 'asleep', 'night', 'tired', 'rest'],
    ['stress', 'pressure', 'overwhelmed', 'burnout', 'load'],
    ['exam', 'test', 'study', 'midterm', 'college', 'marks', 'academic'],
    ['anxiety', 'panic', 'nervous', 'scared', 'fear'],
    ['happy', 'relaxed', 'calm', 'peace', 'joy', 'good'],
    ['friend', 'lunch', 'social', 'family', 'campus', 'roommate'],
    ['sad', 'lonely', 'depressed', 'alone', 'cry', 'hopeless'],
  ];

  // 1. Emotion Root Bucket Weights
  EMOTION_ROOTS.forEach((cluster, clusterIdx) => {
    for (const token of cluster) {
      if (clean.includes(token)) {
        vector[clusterIdx * 2] += 2.0;
        vector[clusterIdx * 2 + 1] += 1.5;
      }
    }
  });

  // 2. Character Tri-Gram Shingles (FastText / sub-word hashing)
  for (const word of words) {
    if (word.length >= 3) {
      for (let j = 0; j <= word.length - 3; j++) {
        const shingle = word.substring(j, j + 3);
        let h = 0;
        for (let c = 0; c < 3; c++) {
          h = (h * 31 + shingle.charCodeAt(c)) >>> 0;
        }
        vector[h % dimensions] += 0.8;
      }
    } else {
      let h = word.charCodeAt(0) * 31;
      vector[h % dimensions] += 0.5;
    }
  }

  // 3. L2 Vector Normalization
  let sumSq = 0;
  for (let i = 0; i < dimensions; i++) {
    sumSq += vector[i] * vector[i];
  }

  const norm = Math.sqrt(sumSq);
  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) {
      vector[i] = vector[i] / norm;
    }
  }

  return Array.from(vector);
}

class VectorMemoryEngine {
  constructor() {
    this.memoryStore = new Map();
  }

  /**
   * Stores an emotional conversation turn or reflection in long-term vector memory.
   */
  storeStudentMemory({
    studentId,
    text,
    emotion = 'neutral',
    moodRating = 5,
    contextTag = 'general',
    timestamp = new Date().toISOString(),
  }) {
    if (!studentId || !text) return null;

    if (!this.memoryStore.has(studentId)) {
      this.memoryStore.set(studentId, []);
    }

    const embedding = generateSemanticEmbedding(text);
    const memoryRecord = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      studentId,
      text,
      emotion,
      moodRating: Math.max(1, Math.min(10, Number(moodRating) || 5)),
      contextTag,
      embedding,
      timestamp,
    };

    const studentMemories = this.memoryStore.get(studentId);
    studentMemories.push(memoryRecord);

    if (studentMemories.length > 100) {
      studentMemories.shift();
    }

    return memoryRecord;
  }

  /**
   * Queries student vector memory to retrieve top-K semantically relevant past events (RAG).
   */
  retrieveRelevantMemories({
    studentId,
    queryText,
    topK = 3,
    minSimilarity = 0.25,
  }) {
    const studentMemories = this.memoryStore.get(studentId);
    if (!studentMemories || studentMemories.length === 0) {
      return [];
    }

    const queryEmbedding = generateSemanticEmbedding(queryText);

    const scored = studentMemories.map((mem) => {
      const similarity = calculateCosineSimilarity(queryEmbedding, mem.embedding);
      return {
        id: mem.id,
        text: mem.text,
        emotion: mem.emotion,
        contextTag: mem.contextTag,
        moodRating: mem.moodRating,
        timestamp: mem.timestamp,
        similarity: Number(similarity.toFixed(4)),
      };
    });

    return scored
      .filter((m) => m.similarity >= minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  /**
   * Generates emotional trajectory timeline for counselor review or student progress tracking.
   */
  getEmotionalTimeline(studentId) {
    const studentMemories = this.memoryStore.get(studentId) || [];
    return studentMemories.map((m) => ({
      timestamp: m.timestamp,
      mood: m.moodRating,
      emotion: m.emotion,
      tag: m.contextTag,
      snippet: m.text.substring(0, 60),
    }));
  }

  /**
   * Purges a student's memory upon request (DPDP / Right to be Forgotten compliance).
   */
  forgetStudent(studentId) {
    return this.memoryStore.delete(studentId);
  }
}

const vectorMemoryEngine = new VectorMemoryEngine();

module.exports = {
  vectorMemoryEngine,
  calculateCosineSimilarity,
  generateSemanticEmbedding,
};
