import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useQuizStore } from '../store/store';

// Helper mapping for category icons
const CATEGORY_ICONS = {
  'General Culture': '🌐',
  Logic: '🧠',
  Entertainment: '🎬',
};

/**
 * QuestionCard Component
 * Displays the current question, category pill, 4 options with answer feedback,
 * and a "Next question" button after selection.
 */
export default function QuestionCard() {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const category = useQuizStore((state) => state.category);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset local answer selection whenever currentQuestionIndex changes
  useEffect(() => {
    setSelectedIndex(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
    answerQuestion(isCorrect);
  };

  const categoryIcon = CATEGORY_ICONS[category] || '⚡';

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Pill Tag */}
        <View style={styles.categoryPillContainer}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryIcon}>{categoryIcon}</Text>
            <Text style={styles.categoryText}>{category || 'Quiz'}</Text>
          </View>
        </View>

        {/* Main Question Card Container */}
        <View style={styles.card}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsList}>
            {currentQuestion.options.map((option, index) => {
              const isCorrectOption = index === currentQuestion.correctAnswerIndex;
              const isSelectedOption = index === selectedIndex;

              let optionStyle = styles.optionNormal;
              let textStyle = styles.optionTextNormal;
              let renderIcon = null;

              if (isAnswered) {
                if (isCorrectOption) {
                  optionStyle = styles.optionCorrect;
                  textStyle = styles.optionTextCorrect;
                  renderIcon = (
                    <View style={styles.correctBadge}>
                      <Text style={styles.badgeText}>✓</Text>
                    </View>
                  );
                } else if (isSelectedOption && !isCorrectOption) {
                  optionStyle = styles.optionIncorrect;
                  textStyle = styles.optionTextIncorrect;
                  renderIcon = (
                    <View style={styles.incorrectBadge}>
                      <Text style={styles.badgeText}>✕</Text>
                    </View>
                  );
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionBase, optionStyle]}
                  onPress={() => handleSelectOption(index)}
                  activeOpacity={0.7}
                  disabled={isAnswered}
                >
                  <Text style={[styles.optionTextBase, textStyle]}>{option}</Text>
                  {renderIcon && <View style={styles.iconWrapper}>{renderIcon}</View>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Full-Width "Next Question" Button */}
      {isAnswered && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>Next question</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  categoryPillContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F97316',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: '#F3EEDD',
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 28,
  },
  optionsList: {
    gap: 12,
  },
  optionBase: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 56,
  },
  optionTextBase: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Default Option State
  optionNormal: {
    backgroundColor: '#FFFBF5',
    borderColor: '#F3EEDD',
  },
  optionTextNormal: {
    color: '#1F2937',
  },
  // Correct Answer State
  optionCorrect: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  optionTextCorrect: {
    color: '#15803D',
    fontWeight: '700',
  },
  // Incorrect Answer State
  optionIncorrect: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  optionTextIncorrect: {
    color: '#991B1B',
    fontWeight: '700',
  },
  iconWrapper: {
    position: 'absolute',
    right: 16,
  },
  correctBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrectBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#FFFDF9',
  },
  nextButton: {
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
