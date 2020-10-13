import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export {};

declare global {
  type RootStackParamList = {
    Home: undefined;
    Quiz: undefined;
    Results: {
      totalTime: number;
      answers: AnswersResults[];
    };
  };
  type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
  >;
  type QuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Quiz'
  >;
  type ResultsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Results'
  >;
  type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;
  type AnswersResults = {
    correctAnswer: string;
    userAnswer: string;
  };
  type QuizData = {
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  };
  type QuizAPIResponse = {
    response_code: number;
    results: QuizData[];
  };
}
