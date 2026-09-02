import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/questions';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  category: null,
  isLoading: false,
  isFinished: false,
};

export const useQuizStore = create((set, get) => ({
  ...initialState,

  fetchQuestions: async (selectedCategory) => {
    set({
      isLoading: true,
      category: selectedCategory,
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
    });

    try {
      const response = await axios.get(API_URL);
      const filteredQuestions = response.data.filter(
        (item) => item.category === selectedCategory
      );

      set({ questions: filteredQuestions, isLoading: false });
    } catch (error) {
      console.error('Error fetching questions:', error);
      set({ isLoading: false });
    }
  },

  answerQuestion: (isCorrect) => {
    const { currentQuestionIndex, questions, score } = get();
    const nextIndex = currentQuestionIndex + 1;
    const isQuizFinished = nextIndex >= questions.length;

    set({
      score: isCorrect ? score + 1 : score,
      currentQuestionIndex: isQuizFinished ? currentQuestionIndex : nextIndex,
      isFinished: isQuizFinished,
    });
  },

  resetQuiz: () => {
    set({ ...initialState });
  },
}));
