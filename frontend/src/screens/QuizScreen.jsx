import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useQuizStore } from '../store/store';
import CategorySelector from '../components/CategorySelector';
import QuestionCard from '../components/QuestionCard';
import ResultCard from '../components/ResultCard';
import ProgressBar from '../components/ProgressBar';

/**
 * QuizScreen Orchestrator
 * Manages high-level screen flow using Zustand store state.
 */
export default function QuizScreen() {
  const category = useQuizStore((state) => state.category);
  const isFinished = useQuizStore((state) => state.isFinished);

  const renderContent = () => {
    if (category === null) {
      return <CategorySelector />;
    }

    if (isFinished) {
      return <ResultCard />;
    }

    return (
      <View style={styles.quizContainer}>
        <ProgressBar />
        <QuestionCard />
      </View>
    );
  };

  return <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  quizContainer: {
    flex: 1,
  },
});
