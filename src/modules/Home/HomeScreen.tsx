import React from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled(Button).attrs({
  labelStyle: {fontSize: 25},
})``;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <StartButton mode="contained" onPress={() => navigation.navigate('Quiz')}>
        Start Quiz
      </StartButton>
    </Container>
  );
};

export default HomeScreen;
