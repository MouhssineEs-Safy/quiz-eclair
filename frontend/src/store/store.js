import { create } from 'zustand';

const MOCK_QUESTIONS = {
  'General Culture': [
    {
      id: 'g1',
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswerIndex: 2,
    },
    {
      id: 'g2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswerIndex: 1,
    },
    {
      id: 'g3',
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      correctAnswerIndex: 2,
    },
    {
      id: 'g4',
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswerIndex: 3,
    },
    {
      id: 'g5',
      question: 'How many continents are there on Earth?',
      options: ['5', '6', '7', '8'],
      correctAnswerIndex: 2,
    },
  ],
  'Logic': [
    {
      id: 'l1',
      question: 'Which number continues the sequence: 2, 4, 8, 16, ...?',
      options: ['24', '32', '64', '20'],
      correctAnswerIndex: 1,
    },
    {
      id: 'l2',
      question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
      options: ['Yes', 'No', 'Cannot be determined', 'Only on Tuesdays'],
      correctAnswerIndex: 0,
    },
    {
      id: 'l3',
      question: 'Which shape has 5 sides?',
      options: ['Hexagon', 'Pentagon', 'Octagon', 'Heptagon'],
      correctAnswerIndex: 1,
    },
    {
      id: 'l4',
      question: 'A doctor gives you 3 pills and tells you to take one every 30 minutes. How long do they last?',
      options: ['90 minutes', '60 minutes', '30 minutes', '120 minutes'],
      correctAnswerIndex: 1,
    },
    {
      id: 'l5',
      question: 'Which number is missing: 3, 6, 9, 12, __?',
      options: ['13', '14', '15', '16'],
      correctAnswerIndex: 2,
    },
  ],
  'Entertainment': [
    {
      id: 'e1',
      question: 'Which movie won the Best Picture Oscar in 2020?',
      options: ['1917', 'Parasite', 'Joker', 'Once Upon a Time in Hollywood'],
      correctAnswerIndex: 1,
    },
    {
      id: 'e2',
      question: 'Who sang the song "Thriller"?',
      options: ['Prince', 'Michael Jackson', 'Stevie Wonder', 'Whitney Houston'],
      correctAnswerIndex: 1,
    },
    {
      id: 'e3',
      question: 'Which superhero is also known as Bruce Wayne?',
      options: ['Superman', 'Spider-Man', 'Batman', 'Iron Man'],
      correctAnswerIndex: 2,
    },
    {
      id: 'e4',
      question: 'In which fictional universe does Harry Potter live?',
      options: ['Middle-earth', 'Narnia', 'Wizarding World', 'Westeros'],
      correctAnswerIndex: 2,
    },
    {
      id: 'e5',
      question: 'Which video game features the character Mario?',
      options: ['Sonic the Hedgehog', 'Super Mario Bros', 'The Legend of Zelda', 'Minecraft'],
      correctAnswerIndex: 1,
    },
  ],
};

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
    set({ isLoading: true, category: selectedCategory, currentQuestionIndex: 0, score: 0, isFinished: false });

    // Simulate network call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const categoryQuestions = MOCK_QUESTIONS[selectedCategory] || MOCK_QUESTIONS['General Culture'] || [];
    set({ questions: categoryQuestions, isLoading: false });
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
