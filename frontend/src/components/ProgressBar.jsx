import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuizStore } from '../store/store';

/**
 * ProgressBar Component
 * Displays the current question number, back button, completion percentage,
 * and a animated-style horizontal progress bar.
 */
export default function ProgressBar() {
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const questions = useQuizStore((state) => state.questions);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const totalQuestions = questions.length || 5;
  const currentDisplayNumber = Math.min(currentQuestionIndex + 1, totalQuestions);
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((currentDisplayNumber / totalQuestions) * 100))
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={resetQuiz}
          style={styles.backButton}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.questionCounter}>
          Question {currentDisplayNumber}/{totalQuestions}
        </Text>

        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  backChevron: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1F2937',
    marginTop: -4,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    width: 36,
    textAlign: 'right',
  },
  track: {
    height: 10,
    width: '100%',
    backgroundColor: '#F3EEDD',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 5,
  },
});
