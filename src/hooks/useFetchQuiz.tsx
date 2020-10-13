import {useEffect, useState} from 'react';
import {getQuiz} from '../services/RequestService';

export default () => {
  const [quiz, setQuiz] = useState<QuizData[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getQuiz();
      setQuiz(data);
    })();
  }, []);
  return quiz;
};
