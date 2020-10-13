import React from 'react';
import {Title, DataTable, Button} from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`;

const BackButton = styled(Button).attrs({
  labelStyle: {fontSize: 20},
})`
  width: 100%;
  margin-top: 32px;
`;

const AnswerRow = styled(DataTable.Row)`
  background-color: ${({correct}) => (correct ? 'darkgreen' : 'darkred')};
`;

type Props = {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
};

const ResultsScreen: React.FC<Props> = ({route, navigation}) => {
  const {totalTime, answers} = route.params;
  return (
    <Container>
      <Title>{totalTime} seconds</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Your Answer</DataTable.Title>
          <DataTable.Title>Correct Answer</DataTable.Title>
        </DataTable.Header>
        {answers.map((answer, i) => {
          return (
            <AnswerRow
              correct={answer.userAnswer === answer.correctAnswer}
              key={i}>
              <DataTable.Cell>{answer.userAnswer}</DataTable.Cell>
              <DataTable.Cell>{answer.correctAnswer}</DataTable.Cell>
            </AnswerRow>
          );
        })}
      </DataTable>
      <BackButton
        mode="contained"
        onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}>
        Back Home
      </BackButton>
    </Container>
  );
};

export default ResultsScreen;
