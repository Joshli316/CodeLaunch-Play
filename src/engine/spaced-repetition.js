/**
 * SM-2 Spaced Repetition Algorithm
 */
import { getMastery, setMastery } from '../state.js';

export function reviewTerm(key, correct) {
  const m = getMastery(key);
  const now = Date.now();

  if (correct) {
    if (m.stars === 0) {
      m.stars = 1;
      m.interval = 1;
    } else {
      // Check if enough time has elapsed for next star
      const daysSinceLast = m.lastCorrect ? (now - m.lastCorrect) / (1000 * 60 * 60 * 24) : 0;
      const starThresholds = [0, 0, 1, 3, 7, 14]; // days needed for each star
      if (m.stars < 5 && daysSinceLast >= starThresholds[m.stars]) {
        m.stars = Math.min(5, m.stars + 1);
      }
      // SM-2: update interval and ease
      m.ease = Math.max(1.3, m.ease + 0.1);
      m.interval = Math.round(m.interval * m.ease);
    }
    m.lastCorrect = now;
  } else {
    // Wrong answer: drop 1 star, reset interval
    m.stars = Math.max(0, m.stars - 1);
    m.interval = 1;
    m.ease = Math.max(1.3, m.ease - 0.2);
  }

  m.nextReview = now + m.interval * 24 * 60 * 60 * 1000;
  setMastery(key, m);
  return m;
}

export function getDueTerms(allKeys) {
  const now = Date.now();
  return allKeys.filter(key => {
    const m = getMastery(key);
    return !m.nextReview || m.nextReview <= now;
  });
}

export function getMasteryPercentage(allKeys) {
  if (allKeys.length === 0) return 0;
  const mastered = allKeys.filter(key => getMastery(key).stars >= 5).length;
  return Math.round((mastered / allKeys.length) * 100);
}

export function getStarCounts(allKeys) {
  const counts = [0, 0, 0, 0, 0, 0]; // 0-5 stars
  allKeys.forEach(key => {
    const m = getMastery(key);
    counts[m.stars]++;
  });
  return counts;
}
