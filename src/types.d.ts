import {StackNavigationProp} from '@react-navigation/stack';

export {};

declare global {
  type RootStackParamList = {
    Home: undefined;
  };
  type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
  >;
}
