import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuizStore } from '../store/store';

// Decorative confetti particles data
const CONFETTI_ITEMS = [
  { id: 1, top: '6%', left: '15%', color: '#F97316', rotate: '15deg', width: 6, height: 14 },
  { id: 2, top: '8%', right: '22%', color: '#C084FC', rotate: '-25deg', width: 10, height: 6 },
  { id: 3, top: '16%', left: '26%', color: '#FACC15', rotate: '45deg', width: 8, height: 8 },
  { id: 4, top: '15%', right: '12%', color: '#F97316', rotate: '-10deg', width: 7, height: 12 },
  { id: 5, top: '32%', left: '10%', color: '#38BDF8', rotate: '30deg', width: 12, height: 6 },
  { id: 6, top: '35%', right: '15%', color: '#C084FC', rotate: '-40deg', width: 14, height: 6 },
  { id: 7, top: '48%', left: '18%', color: '#C084FC', rotate: '20deg', width: 8, height: 14 },
  { id: 8, top: '50%', right: '20%', color: '#F97316', rotate: '50deg', width: 10, height: 6 },
  { id: 9, top: '62%', left: '12%', color: '#F97316', rotate: '-15deg', width: 8, height: 12 },
  { id: 10, top: '64%', right: '10%', color: '#FACC15', rotate: '35deg', width: 6, height: 14 },
];

/**
 * ResultCard Component
 * Displays the final score in a circular meter, confetti decorations,
 * congratulatory message, and restart actions.
 */
export default function ResultCard() {
  const score = useQuizStore((state) => state.score);
  const questions = useQuizStore((state) => state.questions);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const totalQuestions = questions.length || 5;

  return (
    <View style={styles.container}>
      {/* Decorative Confetti Elements */}
      {CONFETTI_ITEMS.map((item) => (
        <View
          key={item.id}
          style={[
            styles.confetti,
            {
              top: item.top,
              left: item.left,
              right: item.right,
              backgroundColor: item.color,
              transform: [{ rotate: item.rotate }],
              width: item.width,
              height: item.height,
            },
          ]}
        />
      ))}

      {/* Main Content Area */}
      <View style={styles.content}>
        {/* Large Circular Progress / Score Display */}
        <View style={styles.scoreCircleOuter}>
          <View style={styles.scoreCircleInner}>
            <Text style={styles.lightningIcon}>⚡</Text>
            <Text style={styles.scoreText}>
              {score}/{totalQuestions}
            </Text>
          </View>
        </View>

        {/* Congratulatory Text */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Well done!</Text>
          <Text style={styles.subtitleText}>You're on a roll. Keep going!</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={resetQuiz}
          activeOpacity={0.85}
        >
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backLink}
          onPress={resetQuiz}
          activeOpacity={0.7}
        >
          <Text style={styles.backLinkText}>Back to categories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    position: 'relative',
  },
  confetti: {
    position: 'absolute',
    borderRadius: 3,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCircleOuter: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 9,
    borderColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // Soft shadow
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 36,
  },
  scoreCircleInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  textContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  restartButton: {
    width: '100%',
    backgroundColor: '#F97316',
    borderRadius: 18,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  backLink: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backLinkText: {
    color: '#F97316',
    fontSize: 15,
    fontWeight: '600',
  },
});
