import React, {useEffect, useState, useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {Title, RadioButton, Button} from 'react-native-paper';
import useFetchQuiz from '../../hooks/useFetchQuiz';

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px;
`;

const OptionsContainer = styled.View`
  margin-top: 16px;
  width: 100%;
`;

const NextButton = styled(Button).attrs({
  labelStyle: {fontSize: 25},
})`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

type Props = {
  navigation: QuizScreenNavigationProp;
};

const QuizScreen: React.FC<Props> = ({navigation}) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizData>>({});
  const [answer, setAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const startTime = useMemo<number>(() => {
    return new Date().getTime();
  }, []);
  const currentOptions = useMemo(() => {
    if (currentQuestion.incorrect_answers) {
      return [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ].sort(() => Math.random() - 0.5);
    }
  }, [currentQuestion]);
  const quiz = useFetchQuiz();

  const goToNextQuestion = () => {
    if (!answer) {
      return;
    }
    if (questionNumber === 9) {
      const finishTime = new Date().getTime();
      const totalTime = (finishTime - startTime) / 1000;
      const allAnswers = [...userAnswers, answer];
      const handleCorrectAnswers: AnswersResults[] = [];
      allAnswers.forEach((a, i) => {
        handleCorrectAnswers.push({
          correctAnswer: quiz[i].correct_answer,
          userAnswer: a,
        });
      });
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Results',
            params: {
              totalTime,
              answers: handleCorrectAnswers,
            },
          },
        ],
      });
      return;
    }
    setUserAnswers((old) => [...old, answer]);
    setQuestionNumber((old) => old + 1);
  };

  useEffect(() => {
    if (quiz.length > 0) {
      setCurrentQuestion(quiz[questionNumber]);
    }
  }, [questionNumber, quiz]);

  if (quiz.length < 1 || !currentQuestion?.question) {
    return (
      <Container>
        <ActivityIndicator color="purple" size={40} />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Title>
          {questionNumber + 1}. {currentQuestion.question}
        </Title>
        <OptionsContainer>
          <RadioButton.Group onValueChange={setAnswer} value={answer}>
            {currentOptions.map((opt) => {
              return <RadioButton.Item label={opt} value={opt} />;
            })}
          </RadioButton.Group>
        </OptionsContainer>
      </Container>
      <NextButton onPress={goToNextQuestion} mode="contained">
        Next
      </NextButton>
    </>
  );
};

export default QuizScreen;
