import axios from 'axios';

export const getQuiz = async (): Promise<QuizData[]> => {
  try {
    const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    const response = await axios.get<QuizAPIResponse>(url);
    return response.data?.results || [];
  } catch (error) {
    return [];
  }
};
